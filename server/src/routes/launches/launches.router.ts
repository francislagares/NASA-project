import express from 'express';
import {
  httpGetAllLaunches,
  httpAddNewLaunch,
} from '../../controllers/launches.controller';

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);

export default launchesRouter;
