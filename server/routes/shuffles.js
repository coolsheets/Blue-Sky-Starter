const express = require('express');
const router = express.Router();
const ShuffleImage = require('../models/ShuffleImage');

// Get all shuffle images
router.get('/shuffles', async (req, res) => {
  const images = await ShuffleImage.find();
  res.json(images);
});

// Add a new shuffle image
router.post('/shuffles', async (req, res) => {
  const newImage = new ShuffleImage(req.body);
  await newImage.save();
  res.json(newImage);
});

module.exports = router;
