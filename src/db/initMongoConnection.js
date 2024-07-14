import mongoose from 'mongoose';
import dotenv from 'dotenv';

async function initMongoConnection() {
    dotenv.config();
  try {
    const MONGODB_URL = process.env.MONGODB_URL || '3000';

    await mongoose.connect(MONGODB_URL);

    console.log('Database connection successfully');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { initMongoConnection };