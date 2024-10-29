const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  } /***additional code must be added to protect the information***/,
  score: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
