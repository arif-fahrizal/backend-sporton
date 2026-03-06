import mongoose from 'mongoose';

declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) {
    return cached.conn; // gunakan koneksi yang sudah ada
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI || '', {
        bufferCommands: false, // matikan buffering
      })
      .then(m => m.connection);
  }

  try {
    cached.conn = await cached.promise;
    console.log('MONGODB CONNECTED SUCCESSFULLY');
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error('MongoDB Connection Error:', error);
    throw error;
  }
};
