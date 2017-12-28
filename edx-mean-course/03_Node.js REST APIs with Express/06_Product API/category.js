var mongoose = require('mongoose');

var categorySchema = {
  // ID
  _id: { type: String },
  // reference to the parent category
  parent: {
    type: String,
    ref: 'Category'
  },
  // references to all ancestors categories.
  ancestors: [{
    type: String,
    ref: 'Category'
  }]
}

module.exports = new mongoose.Schema(categorySchema);
module.exports.categorySchema = categorySchema;