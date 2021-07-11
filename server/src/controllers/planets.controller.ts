import { Request, Response } from 'express';
import { IPlanet } from '../types/planets';
import { getAllPlanets } from '../models/planets.model';

async function httpGetAllPlanets(
  req: Request,
  res: Response,
): Promise<Response<IPlanet>> {
  if (!req.body) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong!',
    });
  }

  return res.status(200).json(await getAllPlanets());
}

export { httpGetAllPlanets };
