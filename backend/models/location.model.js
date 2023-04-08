const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
  name: String,
  address: String,
  city: String,
  state: String,
  country: String,
});

module.exports = mongoose.model('Location', LocationSchema);