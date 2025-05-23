import { connectDb } from "../db.js";
// import mongoose from "mongoose";

const mongoose = await connectDb();

// Schema 
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Models
const User = mongoose.model("User", UserSchema);
export async function createUser(username, password) {
  const newUser = await User.create({ username, password });
  return newUser;
}
export async function findUserByUsername(username) {
  return await User.findOne({ username });
}
export default User;