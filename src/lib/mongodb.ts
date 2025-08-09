import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB_NAME = process.env.DB_NAME;

if (!MONGODB_URI) {
  throw new Error("Connection Error");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI as string;
    if (!uri) throw new Error('MongoDB URI not defined in env');

    const opts = {
      bufferCommands: true, // Changed to true to allow buffering
      dbName: MONGODB_DB_NAME,
      serverSelectionTimeoutMS: 5000,
      ssl: true,
      tlsAllowInvalidCertificates: false,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      console.log('MongoDB connected');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default dbConnect;