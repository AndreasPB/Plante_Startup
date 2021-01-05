const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const UserModel = require('../models/User');

// GETS ALL THE USERS
router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.json({ message: error });
  }
});

// SUBMITS A USER
router.post('/', async (req, res) => {
  console.log('test', req.body);
  const user = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await UserModel.save();
    console.log(`User ${savedUser.username} has been submitted!`);
    res.redirect('/');
  } catch (error) {
    res.json({ message: error });
  }
});

// SPECIFIC USER
router.get('/:id', async (req, res) => {
  try {
    const foundUser = await UserModel.findById(req.params.id);
    res.json(foundUser);
  } catch (error) {
    res.json({ message: error });
  }
});

// DELETE USER
router.delete('/id', async (req, res) => {
  try {
    const removedUser = await UserModel.remove({ _id: req.params.id });
    res.json(removedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

// UPDATE A USER
router.patch('/id', async (req, res) => {
  try {
    const updatedUser = await UserModel.updateOne(
      { _id: req.params.id },
      { $set: { username: req.body.username } },
    );
    res.json(updatedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
