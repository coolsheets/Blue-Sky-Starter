import { Router } from "express";
import {
  createCamera,
  findAllCameras,
  findCameraById,
} from "../models/camera.js";

const router = Router();

// list all cameras
router.get("/", async function (req, res) {
  try {
    const cameras = await findAllCameras();
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
    const camera = createCamera(name);
    return res.send(camera);
  } else {
    return res.sendStatus(400);
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  if (req.body) {
    const camera = createCamera(name);
    return res.send(camera);
  } else {
    return res.sendStatus(400);
  }
});

// get a particular camera
router.get("/:cameraId", async function (req, res) {
  const id = req.params.cityId;
  try {
    const camera = findCameraById(id);
    res.send(camera);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
