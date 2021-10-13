const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  officerId: {
    type: String,
    default: "LIS"
  },
  type: String,
  agency: String,
  fullName: String,
  number: String,
  email: String,
  content: String,
  county: String,
  latitude: String,
  longitude: String,
  category: String,
  status: String,
  date: String,
  updatedBy: String
});

module.exports = mongoose.model("comment", CommentSchema);
