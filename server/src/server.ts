import { app } from './app';
import { loadPlanetsData } from './models/planets.model';
import { loadLaunchData } from './models/launches.model';
import { mongoConnect } from './services/mongodb';

const createServer = async () => {
  try {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();
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
