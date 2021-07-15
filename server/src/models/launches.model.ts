/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable max-lines-per-function */
import axios from 'axios';
import launchesDB from './launches.mongo';
import planets from './planets.mongo';
import { ILaunches } from '../types/launches';

const DEFAULT_FLIGHT_NUMBER = 100;

const launch: ILaunches = {
  flightNumber: 100, // flight_number
  mission: 'Kepler Exploration X', // name
  rocket: 'Explorer IS1', // rocket.name
  launchDate: new Date('December 27, 2030'), // date_local
  target: 'Kepler-442 b', // not applicable
  customers: ['ZTM', 'NASA'], // payload.customer
  upcoming: true, // upcoming
  success: true, // success
};

saveLaunch(launch);

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function populateLaunches() {
  console.log('Downloading launch data...');
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1,
          },
        },
        {
          path: 'payloads',
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  if (response.status !== 200) {
    console.log('Problem downloading launch data');
    throw new Error('Launch data download failed!');
  }

  const launchDocs = response.data.docs;

  for (const launchDoc of launchDocs) {
    const payloads = launchDoc['payloads'];
    // @ts-ignore
    const customers = payloads.flatMap(payload => {
      return payload['customers'];
    });

    const launch: ILaunches = {
      flightNumber: launchDoc['flight_number'],
      mission: launchDoc['name'],
      rocket: launchDoc['rocket']['name'],
      launchDate: launchDoc['date_local'],
      upcoming: launchDoc['upcoming'],
      success: launchDoc['success'],
      customers,
    };

    console.log(`${launch.flightNumber} ${launch.mission}`);

    // populate launches collection
    await saveLaunch(launch);
  }
}

async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission: 'FalconSat',
  });

  if (firstLaunch) {
    console.log('Launch data already loaded!');
  } else {
    await populateLaunches();
  }
}

async function findLaunch(filter: any) {
  return await launchesDB.findOne(filter);
}

async function existsLaunchWithId(launchId: number) {
  return await findLaunch({
    flightNumber: launchId,
  });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDB.findOne({}).sort('-flightNumber');

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

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

async function scheduleNewLaunch(launch: ILaunches) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error('No matching planet found');
  }

  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ['Zero to Mastery', 'NASA'],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId: number) {
  const aborted = await launchesDB.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    },
  );

  return aborted.ok === 1 && aborted.nModified === 1;
}

export {
  loadLaunchData,
  abortLaunchById,
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
};
