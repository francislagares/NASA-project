import { app } from './app';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { loadPlanetsData } from './models/planets.model';

dotenv.config();

const dbUrl = process.env.MONGO_URL as string;

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', err => {
  console.error(err);
});

const createServer = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    await loadPlanetsData();
    // Start the server
    const PORT = 8000;
    // Binding Heroku to 0.0.0.0 instead of localhost
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server listening on port ${PORT}!`);
    });
  } catch (error) {
    console.log(error);
  }
};

createServer();
