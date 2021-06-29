import { app } from './app';
import { loadPlanetsData } from './models/planets.model';

const createServer = async () => {
  try {
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
