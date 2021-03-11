"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: {
    type: String,
    required: "Enter the name of the task",
  },
  info: {
    type: String,
    default: "N/A",
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tasks", TaskSchema);
