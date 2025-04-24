import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // In production, hash passwords!
});

export default mongoose.model("User", userSchema);


export async function createUser(username, password) {
  const newUser = await User.create({ username, password });
  return newUser;
}
export async function findUserByUsername(username) {
  return await User.findOne({ username });
}