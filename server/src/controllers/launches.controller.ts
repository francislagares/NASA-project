import { Request, Response } from 'express';
import { ILaunches } from 'types/launches';
import { getAllLaunches, addNewLaunch } from '../models/launches.model';

function httpGetAllLaunches(req: Request, res: Response): void {
  if (!req.body) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong!',
    });
  }

  res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req: Request, res: Response): Response<ILaunches> {
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

  addNewLaunch(launch);

  return res.status(201).json(launch);
}

export { httpGetAllLaunches, httpAddNewLaunch };
