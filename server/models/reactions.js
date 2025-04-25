import { connectDb } from "../db.js";
const mongoose = await connectDb();

const reactionSchema = new mongoose.Schema({
  Video_URL: { type: String, required: true },
  User_ID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  Reaction_Type: { type: String },
  Star: { type: Number, min: 0, max: 5 },
  Comment: { type: String },
  Favorite: { type: Boolean, default: false }, // ✅ Toggle field
  Created_At: { type: Date, default: Date.now },
});

const Reaction = mongoose.model("Reaction", reactionSchema, "Reactions");

export async function createReaction(Video_URL, User_ID, Reaction_Type, Star, Comment) {
  return await Reaction.create({
    Video_URL,
    User_ID,
    Reaction_Type,
    Star,
    Comment,
  });
}

export async function findAllReactions() {
  return await Reaction.find().populate("User_ID", "email");
}

export async function findReactionByVideoURL(Video_URL) {
  return await Reaction.find({ Video_URL }).populate("User_ID", "email");
}

export async function findReactionsByUserAndVideo(User_ID, Video_URL) {
  return await Reaction.findOne({ User_ID, Video_URL });
}

// ✅ Toggle favorite (corrected)
export async function toggleFavoriteForUserAndVideo(Video_URL, User_ID) {
  const reaction = await Reaction.findOne({ Video_URL, User_ID });

  if (reaction) {
    reaction.Favorite = !reaction.Favorite;
    await reaction.save();
    return reaction.Favorite;
  } else {
    const newReaction = await Reaction.create({
      Video_URL,
      User_ID,
      Favorite: true,
    });
    return newReaction.Favorite;
  }
}

export async function isVideoFavoritedByUser(Video_URL, User_ID) {
  const reaction = await Reaction.findOne({ Video_URL, User_ID });
  return !!reaction?.Favorite;
}
