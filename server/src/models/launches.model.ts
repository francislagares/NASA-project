import launchesDB from './launches.mongo';
import { ILaunches } from '../types/launches';

const launches = new Map();

let latestFligthNumber = 100;

const launch: ILaunches = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

// launches.set(launch.flightNumber, launch);

async function getAllLaunches(): Promise<ILaunches[]> {
  return await launchesDB.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch: ILaunches) {
  await launchesDB.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    },
  );
}

function addNewLaunch(launch: ILaunches): void {
  latestFligthNumber++;
  launches.set(
    latestFligthNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ['ZTM', 'NASA'],
      flightNumber: latestFligthNumber,
    }),
  );
}

export { getAllLaunches, addNewLaunch };
