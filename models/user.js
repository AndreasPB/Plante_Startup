const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  uuid: {
    type: String,
    required: false,
  },
});

userSchema.methods.createJWT = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), exp: Math.floor(Date.now() / 1000) + 60 * 60 },
    process.env.TOKEN_SECRET
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

module.exports = mongoose.model('User', userSchema);
