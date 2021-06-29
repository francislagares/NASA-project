import express from 'express';
import cors from 'cors';
import indexRouter from '../routes';
import planetsRouter from '../routes/planets/planets.router';

const app = express();

// Middlewares...
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes...
app.use('/', indexRouter);
app.use(planetsRouter);

export { app };
