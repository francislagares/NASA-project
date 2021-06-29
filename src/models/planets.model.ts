import parse from 'csv-parse';
import fs from 'fs';
import path from 'path';

export const habitablePlanets: string[] = [];

function isHabitablePlanet(planet: string) {
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
      .on('data', data => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on('error', err => {
        console.log(err);
        reject();
      })
      .on('end', () => {
        console.log(
          habitablePlanets.map(planet => {
            return planet['kepler_name'];
          }),
        );
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve();
      });
  });
}

export default {
  loadPlanetsData,
  planets: habitablePlanets,
};