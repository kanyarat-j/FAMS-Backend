const mongoose = require("mongoose");
const { Schema } = mongoose;

const ActivitySchema= new Schema({
  id:{
    type:String,
    require:true,
    },
 activity:{
    type: String,
    default:Date.now,
    },
 time:{
   type:String
 },
 sets:{
   type: Number
 },
 distance:{
   type:Number
 },
 calories:{
 type:Number
 },
})

module.exports = mongoose.model("activity", ActivitySchema);