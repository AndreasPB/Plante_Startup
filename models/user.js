const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    min: 6,
    max: 25,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    min: [6, 'Password is less than 6 characters! Please enter more secure one'],
    max: 1024,
    required: true,
  },
  email: {
    type: String,
    min: 6,
    max: 255,
    unique: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error('Invalid E-mail!');
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
