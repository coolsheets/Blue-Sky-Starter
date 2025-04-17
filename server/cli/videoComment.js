import { disconnectDb } from "../db.js";
import { createReaction } from "../models/reactions.js";

if (process.argv.length < 4) {
  console.log(
    "Useage: node createReaction <Video_URL>, <Reaction_Type>, <Star>, <Comment>"
  );
  process.exit();
}

const video_url = process.argv[2];
const reaction_type = process.argv[3];
const star = process.argv[4];
const comment = process.argv[5];

console.log("Creating " + video_url);
console.log(" with type: " + reaction_type);
console.log(" with star: " + star);
console.log(" with comment: " + comment);

const newReaction = await createReaction(
  video_url,
  reaction_type,
  star,
  comment
);
console.log("Created", newReaction);

disconnectDb();
