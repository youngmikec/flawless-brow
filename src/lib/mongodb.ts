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
// let cached = (global as any).mongoose;

// if (!cached) {
//   cached = (global as any).mongoose = { conn: null, promise: null };
// }

let isConnected = false;

async function dbConnect() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI as string;

  if (!uri) throw new Error('MongoDB URI not defined in env');

  try {
    const opts = {
      bufferCommands: false,
      dbName: MONGODB_DB_NAME,
      serverSelectionTimeoutMS: 5000, // shorter timeout
      ssl: true,
      tlsAllowInvalidCertificates: false,
    };

    const db = await mongoose.connect(uri, opts);
    isConnected = db.connections[0].readyState === 1;

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default dbConnect;