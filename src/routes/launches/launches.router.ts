import express from 'express';
import { getAllLaunches } from '../../controllers/launches.controller';

const launchesRouter = express.Router();

launchesRouter.get('/launches', getAllLaunches);

export default launchesRouter;
