import express from 'express';
import { httpGetAllLaunches } from '../../controllers/launches.controller';

const launchesRouter = express.Router();

launchesRouter.get('/launches', httpGetAllLaunches);

export default launchesRouter;
