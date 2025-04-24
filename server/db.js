import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongo_uri =
  process.env.MONGO_URI || "mongodb://localhost:27017/blueskyDb";
// const mongo_uri = "mongodb://127.0.0.1:27017/blueskyDb";

console.log(mongo_uri);

let connectionPromise = null;

export async function connectDb() {
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(mongo_uri);
  }
  return await connectionPromise;
}

export async function disconnectDb() {
  if (connectionPromise) {
    const mongoose = await connectionPromise;
    await mongoose.connection.close();
    connectionPromise = null;
  }
}
