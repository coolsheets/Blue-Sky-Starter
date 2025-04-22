import { connectDb } from "../db.js";

const mongoose = await connectDb();

// Tony and Mike modified part of this file to add the reactions schema and model on April 17th, 2025
const reactionSchema = new mongoose.Schema({
  Video_URL: { type: String, required: true },
  User_ID: { type: String, required: true },
  Reaction_Type: { type: Boolean, default: false }, // true = like, false = dislike
  Star: { type: Number, min: 1, max: 5 },
  Comment: { type: String },
  Created_At: { type: Date, default: Date.now },
});

// Create the model
const Reaction = mongoose.model("Reaction", reactionSchema, "Reactions");

// functions to expose to the outside world!
export async function createReaction(
  Video_URL,
  User_ID,
  Reaction_Type,
  Star,
  Comment
) {
  const newReaction = await Reaction.create({
    Video_URL,
    User_ID,
    Reaction_Type,
    Star,
    Comment,
  });

  return newReaction;
}

export async function findReactionsByVideoURL(Video_URL) {
  return await Reaction.find({ Video_URL });
}

export async function findReactionsByUserAndVideo(User_ID, Video_URL) {
  return await Reaction.findOne({ User_ID, Video_URL });
}

// Alternatively, you can use this function to create a reaction without the comment
export async function createReactionWithoutComment(
  Video_URL,
  Reaction_Type,
  Star
) {
  const reactWNoComment = await Reaction.create({
    Video_URL,
    Reaction_Type,
    Star,
  });

  return reactWNoComment;
}

// Noted the below are created by Vathsela ----

export async function findAllReactions() {
  const reactions = await Reaction.find();
  return reactions;
}

export async function findReactionByVideoURL(Video_URL) {
  const data = await Reaction.find({ Video_URL: Video_URL });
  return data;
}
