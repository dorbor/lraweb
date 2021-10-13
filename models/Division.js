//jshint esversion:7
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DivisionSchema = new Schema({
  agency: {
    type: String,
    default: "LIS",
  },
  title: String,
  desc: String,
  createdAt: String,
});

module.exports = mongoose.model("Division", DivisionSchema);
