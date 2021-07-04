import { Request, Response } from 'express';
import { getAllPlanets } from '../models/planets.model';

function httpGetAllPlanets(req: Request, res: Response): Response<string[]> {
  if (!req.body) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong!',
    });
  }

  return res.status(200).json(getAllPlanets());
}

export { httpGetAllPlanets };
