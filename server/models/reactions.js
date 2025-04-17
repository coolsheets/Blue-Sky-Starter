import { connectDb } from "../db.js";

const mongoose = await connectDb();
// Below is a bit modified by Tony and Mike on April 17th, 2025

const reactionSchema = new mongoose.Schema({
  Video_URL: String,
  Reaction_Type: Boolean, // like or dislike
  Star: Number, // 1-5 stars
  Comment: String,
});

// Models
const Reaction = mongoose.model("Reaction", reactionSchema, "Reactions");

// Functions to expose to the outside world!
export async function createReaction(Video_URL, Reaction_Type, Star, Comment) {
  const newReaction = await Reaction.create({
    Video_URL,
    Reaction_Type,
    Star,
    Comment,
  });

  return newReaction;
}

export async function findAllReactions() {
  const reactions = await Reaction.find();
  return reactions;
}

export async function findReactionByVideoURL(Video_URL) {
  const data = await Reaction.find({ Video_URL: Video_URL });
  return data;
}
