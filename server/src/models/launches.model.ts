import { ILaunches } from '../types/launches';

const launches = new Map();

let latestFligthNumber = 100;

const launch: ILaunches = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches(): ILaunches[] {
  return Array.from(launches.values());
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
