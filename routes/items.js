const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const ItemModel = require('../models/Item');

// GETS ALL THE ITEMS
router.get('/', async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.json(items);
  } catch (error) {
    res.json({ message: error });
  }
});

// SUBMITS AN ITEM
router.post('/', async (req, res) => {
  console.log('test', req.body);
  const item = new ItemModel({
    name: req.body.name,
    price: req.body.price,
    type: req.body.type,
    description: req.body.description,
  });

  try {
    const savedItem = await item.save();
    console.log(savedItem);
    // res.json({ message: 'item successfully added!' }, saveditem);
    res.redirect('/');
  } catch (error) {
    res.json({ message: error });
  }
});

// SPECIFIC ITEM
router.get('/:id', async (req, res) => {
  try {
    const item = await ItemModel.findById(req.params.id);
    res.json(item);
  } catch (error) {
    res.json({ message: error });
  }
});

// DELETE ITEM
router.delete('/id', async (req, res) => {
  try {
    const removeditem = await ItemModel.remove({ _id: req.params.id });
    res.json(removeditem);
  } catch (error) {
    res.json({ message: error });
  }
});

// UPDATE AN ITEM
router.patch('/id', async (req, res) => {
  try {
    const updateditem = await ItemModel.updateOne(
      { _id: req.params.id },
      { $set: { namee: req.body.name } },
    );
    res.json(updateditem);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
