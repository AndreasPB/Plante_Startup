const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const Post = require('../models/post');

// GETS ALL THE POSTS
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

// SUBMITS A POST
router.post('/', async (req, res) => {
  console.log('test', req.body);
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedPost = await post.save();
    console.log(savedPost);
    // res.json({ message: 'post successfully added!' }, savedPost);
    res.redirect('/');
  } catch (error) {
    res.json({ message: error });
  }
});

// SPECIFIC POST
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (error) {
    res.json({ message: error });
  }
});

// DELETE POST
router.delete('/id', async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.id });
    res.json(removedPost);
  } catch (error) {
    res.json({ message: error });
  }
});

// UPDATE A POST
router.patch('/id', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title } },
    );
    res.json(updatedPost);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
