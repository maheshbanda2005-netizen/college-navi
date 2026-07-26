import mongoose from 'mongoose';
import { config } from './index';

export async function connectDatabase(): Promise<void> {
  try {
    let mongoURI = config.MONGODB_URI || '';

    if (!mongoURI || mongoURI.includes('localhost')) {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      mongoURI = mongod.getUri();
      console.log('Using in-memory MongoDB (no local MongoDB required)');
    }

    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}
