import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is missing');
}

// Cache global pour éviter les connexions multiples
let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() { // 🔹 Utiliser export function
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'evently',
      bufferCommands: false,
    }).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Stocker la connexion dans `global` pour éviter la reconnexion en développement
(global as any).mongoose = cached;
