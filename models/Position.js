//jshint esversion:7
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PositionSchema = new Schema({
  agency: {
    type: String,
    default: "LIS"
  },
  title: String,
  date: String
});

module.exports = mongoose.model("Position", PositionSchema);
