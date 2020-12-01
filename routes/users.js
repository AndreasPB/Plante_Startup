const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const user = require('../models/User');

// GETS ALL THE USERS
router.get('/', async (req, res) => {
  try {
    const users = await user.find();
    res.json(users);
  } catch (error) {
    res.json({ message: error });
  }
});

// SUBMITS A USER
router.user('/', async (req, res) => {
  console.log('test', req.body);
  const user = new user({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const saveduser = await user.save();
    res.redirect('/');
  } catch (error) {
    res.json({ message: error });
  }
});

// SPECIFIC USER
router.get('/:id', async (req, res) => {
  try {
    const user = await user.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.json({ message: error });
  }
});

// DELETE USER
router.delete('/id', async (req, res) => {
  try {
    const removedUser = await user.remove({ _id: req.params.id });
    res.json(removedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

// UPDATE A USER
router.patch('/id', async (req, res) => {
  try {
    const updatedUser = await user.updateOne(
      { _id: req.params.id },
      { $set: { username: req.body.username } },
    );
    res.json(updatedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
