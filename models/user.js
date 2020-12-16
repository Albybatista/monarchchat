var mongoose = require('mongoose');

var feelingSchema = new mongoose.Schema({
  text: String
}, {
  timestamps: true
});

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatar: String,
    feelings: [feelingSchema],
    googleId: String
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('User', userSchema);