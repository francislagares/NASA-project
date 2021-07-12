import { Request, Response } from 'express';
import { ILaunches } from '../types/launches';
import {
  abortLaunchById,
  existsLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
} from '../models/launches.model';

async function httpGetAllLaunches(
  req: Request,
  res: Response,
): Promise<Response<ILaunches[]>> {
  if (!req.body) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong!',
    });
  }

  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(
  req: Request,
  res: Response,
): Promise<Response<ILaunches>> {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: 'Missing required launch property',
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Invalid launch date',
    });
  }

  await scheduleNewLaunch(launch);

  return res.status(201).json(launch);
}

async function httpAbortLaunch(
  req: Request,
  res: Response,
): Promise<Response<void>> {
  const launchId = Number(req.params.id);

  const existsLaunch = await existsLaunchWithId(launchId);

  if (!existsLaunch) {
    return res.status(404).json({
      error: 'Launch not found',
    });
  }

  const aborted = await abortLaunchById(launchId);
  if (!aborted) {
    return res.status(400).json({
      error: 'Launch not aborted',
    });
  }

  return res.status(200).json({
    ok: true,
  });
}

export { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
