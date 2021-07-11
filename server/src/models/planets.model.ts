import parse from 'csv-parse';
import fs from 'fs';
import path from 'path';
import planets from './planets.mongo';
import { IPlanetSpecs, IPlanet } from '../types/planets';

export const habitablePlanets: string[] = [];

function isHabitablePlanet(planet: IPlanetSpecs) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

export function loadPlanetsData(): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'),
    )
      .pipe(
        parse({
          comment: '#',
          columns: true,
        }),
      )
      .on('data', async data => {
        if (isHabitablePlanet(data)) {
          await planets.create({
            keplerName: data.kepler_name,
          });
        }
      })
      .on('error', err => {
        console.log(err);
        reject();
      })
      .on('end', () => {
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve();
      });
  });
}

export async function getAllPlanets(): Promise<IPlanet[]> {
  return await planets.find({});
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
