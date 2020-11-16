const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    max: 25,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    min: [6, 'Password is less than 6 characters! Please enter more secure one'],
    max: 25,
    required: true,
  },
  email: {
    type: String,
    max: 50,
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

module.exports = mongoose.model('Users', UserSchema);
