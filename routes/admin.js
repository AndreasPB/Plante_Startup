const router = require('express').Router();
const verify = require('./verifyAuth');

const User = require('../models/User');

router.get('/', verify, (req, res) => {
  res.send(req.user);
});

// GETS ALL THE POSTS
router.get('/secret', verify, async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.json(users);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
