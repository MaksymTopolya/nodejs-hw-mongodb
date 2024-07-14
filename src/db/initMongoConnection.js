import mongoose from 'mongoose';


async function initMongoConnection() {
  try {
    const MONGODB_URL = process.env.MONGODB_URL;

    await mongoose.connect(MONGODB_URL);

    console.log('Database connection successfully');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { initMongoConnection };