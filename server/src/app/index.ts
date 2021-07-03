import path from 'path';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import indexRouter from '../routes';
import planetsRouter from '../routes/planets/planets.router';
import launchesRouter from '../routes/launches/launches.router';

const app = express();

// Middlewares...
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

// Routes...
app.use(planetsRouter);
app.use(launchesRouter);
app.use('/*', indexRouter);

export { app };
