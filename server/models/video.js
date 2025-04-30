import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true }, // ✅ change from title → filename
    description: { type: String },
    stats: {
      likes: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
      favorites: { type: Number, default: 0 },
      averageRating: { type: Number, default: 0 },
    },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Video", videoSchema);