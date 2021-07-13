import path from 'path';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import indexRouter from '../routes';
import api from '../routes/api';

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
app.use('/v1', api);
app.use('/*', indexRouter);

export { app };
