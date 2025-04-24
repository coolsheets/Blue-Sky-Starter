import Interaction from "./models/Interaction.js";
import Video from "./models/video.js";
import mongoose from "mongoose";

export async function recordInteraction({
  userId,
  videoId,
  liked,
  rating,
  comment,
  watchTimeSeconds = 0,
}) {
  const update = {
    ...(liked !== undefined && { liked }),
    ...(rating !== undefined && { rating }),
    ...(comment && { comment }),
    viewedAt: new Date(),
    $inc: { watchTimeSeconds },
  };

  return Interaction.findOneAndUpdate({ userId, videoId }, update, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  });
}

export async function updateVideoStats(videoId) {
  const [likes, comments, ratings] = await Promise.all([
    Interaction.countDocuments({ videoId, liked: true }),
    Interaction.countDocuments({
      videoId,
      comment: { $exists: true, $ne: "" },
    }),
    Interaction.aggregate([
      {
        $match: {
          videoId: new mongoose.Types.ObjectId(videoId),
          rating: { $exists: true },
        },
      },
      { $group: { _id: null, avg: { $avg: "$rating" } } },
    ]),
  ]);

  const avgRating = ratings.length > 0 ? ratings[0].avg : 0;

  await Video.findByIdAndUpdate(videoId, {
    $set: {
      "stats.likes": likes,
      "stats.comments": comments,
      "stats.averageRating": avgRating,
    },
  });
}

export async function getTopRatedVideos(limit = 10) {
  return Interaction.aggregate([
    { $match: { rating: { $exists: true, $ne: null } } },
    {
      $group: {
        _id: "$videoId",
        avgRating: { $avg: "$rating" },
        totalRatings: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "_id",
        foreignField: "_id",
        as: "video",
      },
    },
    { $unwind: "$video" },
    { $sort: { avgRating: -1 } },
    { $limit: limit },
    {
      $project: {
        videoId: "$_id",
        title: "$video.title",
        avgRating: { $round: ["$avgRating", 2] },
        totalRatings: 1,
      },
    },
  ]);
}
