var Mongoose = require('mongoose');

var User = new Mongoose.Schema({
  email: { type: String, required: true }
});


module.exports = User;

