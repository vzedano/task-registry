'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Enter the name of the task'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  info: {
    type: String,
    default: 'N/A'
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);