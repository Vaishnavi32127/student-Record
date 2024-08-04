const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

module.exports = mongoose.model('Student', StudentSchema);
