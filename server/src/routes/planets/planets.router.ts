import express from 'express';
import { httpGetAllPlanets } from '../../controllers/planets.controller';

const planetsRouter = express.Router();

planetsRouter.get('/planets', httpGetAllPlanets);

export default planetsRouter;
