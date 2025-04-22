import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to videos folder and output
const videoDir = path.join(__dirname, "../../client/public/videos");
const outputFile = path.join(__dirname, "../../client/public/jsonVideo/index.json");

// Ensure the videos directory exists
if (!fs.existsSync(videoDir)) {
  console.error(`Directory not found: ${videoDir}`);
  fs.mkdirSync(videoDir, { recursive: true }); // Create the directory if it doesn't exist
  console.log(`Created missing directory: ${videoDir}`);
}

// Read video files and generate index.json
fs.readdir(videoDir, (err, files) => {
  if (err) throw err;

  const videoFiles = files.filter((file) => file.endsWith(".mp4"));
  fs.mkdirSync(path.dirname(outputFile), { recursive: true }); // Ensure output directory exists
  fs.writeFileSync(outputFile, JSON.stringify(videoFiles, null, 2));

  console.log("index.json generated with:", videoFiles);
});
