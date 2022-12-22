const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  id:{
    type:String,
    require:true,
  },
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    default: "",
  },
  weight: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
  gender: {
    type: String,
    default: "",
  },
  DOB: {
    type: String,
    default: Date.now,
  },

});

module.exports = mongoose.model("User", UserSchema);
