const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: String,
  email: String,
  password: String,
  token: String,
  tokenExpirationDate: Date,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
