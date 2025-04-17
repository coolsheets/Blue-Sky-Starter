import { createReaction } from "../models/reactions.js"; // Correct relative path

(async () => {
  try {
    const result = await createReaction("xxx", true, 3, "check it out");
    console.log("Reaction created:", result);
  } catch (error) {
    console.error("Error creating reaction:", error);
  }
})();
