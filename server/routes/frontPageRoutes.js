import { Router } from "express";

// // Below are the imports for the login routes for later use
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// Above import is for use.

import {
  createCameraLocation,
  findAllCameraLocations,
  findCameraLocationById,
} from "../models/cameralocations.js";

const router = Router();

// list all cameras
router.get("/", async function (req, res) {
  try {
    const cameras = await findAllCameraLocations();
    res.send(cameras);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// create a new camera
router.post("/", async (req, res) => {
  const { name } = req.body;

  if (req.body) {
    const camera = createCameraLocation(name);
    return res.send(camera);
  } else {
    return res.sendStatus(400);
  }
});

// get a particular camera
router.get("/:cameraId", async function (req, res) {
  const id = req.params.cityId;
  try {
    const camera = findCameraLocationById(id);
    res.send(camera);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// // == ----------------- user logging to the web console ==
// // routes/auth.js

// // Note: this is just an example for the hardcorded user login, which would be replaced with DB logic
// const users = [
//   {
//     id: 1,
//     email: "user@test.com",
//     passwordHash: bcrypt.hashSync("password123", 10),
//   },
// ];

// // POST /login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   const user = users.find((u) => u.email === email);
//   if (!user)
//     return res.status(401).json({ message: "Invalid email or password." });

//   const isMatch = await bcrypt.compare(password, user.passwordHash);
//   if (!isMatch)
//     return res.status(401).json({ message: "Invalid email or password." });

//   const token = jwt.sign({ userId: user.id }, "your_jwt_secret", {
//     expiresIn: "1h",
//   });

//   res.json({ token, user: { id: user.id, email: user.email } });
// });

// // == ---------------- user logging to the web console ==

// update a camera
router.put("/:cameraId", async function (req, res) {
  const id = req.params.cameraId;
  const { name } = req.body;
  try {
    const camera = await findCameraById(id);
    camera.name = name;
    res.send(camera);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// =========== this is a placeholder for the delete route ===========
router.delete("/:cameraId", async function (req, res) {
  console.log("Deleting ", req.params.cameraId);
  res.sendStatus(200);
});

export default router;
