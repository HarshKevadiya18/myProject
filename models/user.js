const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// By using "passportLocalMongoose" will automaticly add a username, hash and salt field to store the username, the hashed password and the salt value.

const userSchema = new Schema({
  // We don't need to define username and password schema, it is add by "passportLocalMongoose"
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
