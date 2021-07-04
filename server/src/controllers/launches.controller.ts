import { Request, Response } from 'express';
import { getAllLaunches } from '../models/launches.model';

function httpGetAllLaunches(req: Request, res: Response): void {
  res.status(200).json(getAllLaunches());
}

export { httpGetAllLaunches };
