var mongoose = require('mongoose');

// Create a new schema for our tweet data
var schema = new mongoose.Schema({
  name       : {type: String, required: true},
  price      : {type: Number, required: true},
  date       : Date
});

// Return a Tweet model based upon the defined schema
module.exports = mongoose.model('Product', schema);
