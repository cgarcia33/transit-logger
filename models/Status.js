const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StatusSchema = new Schema({
  ongoing: {
    type: Boolean,
    required: true
  },
  _id: {
    type: String,
    required: true
  },
  toggleTime: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Status = mongoose.model("status", StatusSchema, "lineStatus");
