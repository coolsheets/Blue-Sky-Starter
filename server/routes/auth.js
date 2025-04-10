import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// As an example: I've hardcoded the user credentials, which would be replaced with DB logic, when implemented.
// Just like in a live application, where we would fetch this from a database.

const users = [
  {
    id: 1,
    email: "user@example.com",
    passwordHash: bcrypt.hashSync("password123", 10),
  },
];

// POST /login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user)
    return res.status(401).json({ message: "Invalid email or password." });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch)
    return res.status(401).json({ message: "Invalid email or password." });

  const token = jwt.sign({ userId: user.id }, "your_jwt_secret", {
    expiresIn: "1h",
  });

  res.json({ token, user: { id: user.id, email: user.email } });
});

export default router;
