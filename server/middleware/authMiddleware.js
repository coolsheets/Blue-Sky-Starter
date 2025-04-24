// filepath: c:\workspace\blueskystarter-new\Blue-Sky-Starter\server\middleware\authMiddleware.js
import jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret_key"; // Replace with a secure key

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract the token from "Bearer <token>"

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach the decoded user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Invalid token:", error);
    res.status(403).json({ message: "Invalid token." });
  }
};