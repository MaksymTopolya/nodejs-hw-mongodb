import mongoose from 'mongoose';


async function initMongoConnection() {
  try {
    const url = process.env.MONGODB_URL;
    const db = process.env.MONGODB_DB;
    const password = process.env.MONGODB_PASSWORD;
    const user = process.env.MONGODB_USER;
    await mongoose.connect(`mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority`);

    console.log('Database connection successfully');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { initMongoConnection };