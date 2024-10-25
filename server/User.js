const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password:
    String /***additional code must be added to protect the information***/,
  bestscore: Number,
});

module.exports = mongoose.model('User', userSchema);
