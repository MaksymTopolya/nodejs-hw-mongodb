import 'dotenv/config';
import { initMongoConnection } from './db/initMongoConnection.js';
import app from './server.js';


async function bootstrap() {
  try {
    await initMongoConnection();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

bootstrap();




