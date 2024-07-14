import dotenv from 'dotenv';
import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
dotenv.config();

(async () => {
    try {
      setupServer();
    await initMongoConnection();

  } catch (error) {
    console.error('Failed to start server:', error);
  }
})();





