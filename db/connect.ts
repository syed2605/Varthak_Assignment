import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL= process.env.MONGO_URL;
async function connect() {
  try {
    await mongoose.connect( `${MONGO_URL}`);
    console.log('Connected to DB');
  } catch (error) {
    console.error('Error connecting to DB:', error);
  }
}

export default connect;
