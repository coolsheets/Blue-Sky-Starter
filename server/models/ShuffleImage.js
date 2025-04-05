const mongoose = require('mongoose');

const shuffleImageSchema = new mongoose.Schema({
  url: String,
  title: String,
  description: String,
});

module.exports = mongoose.model('ShuffleImage', shuffleImageSchema);
