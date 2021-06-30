import { Request, Response } from 'express';
import { launches } from '../models/launches.model';

function getAllLaunches(req: Request, res: Response): void {
  res.status(200).json(Array.from(launches.values()));
}

export { getAllLaunches };
