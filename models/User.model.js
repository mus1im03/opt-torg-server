const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: String,
  title: String,
  password: String,
  phone: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;