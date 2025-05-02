const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserScheme = new Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("Users", UserScheme);
