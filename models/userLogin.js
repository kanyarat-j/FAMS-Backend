const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserLoginSchema = new Schema({
    email: {
      type: String,
      required: true,
      index: { unique: true },
    },
    loginDate: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = mongoose.model("UserLogin", UserLoginSchema);
  