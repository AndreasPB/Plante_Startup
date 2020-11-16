const express = require('express');
const path = require('path');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/thelist', (req, res) => {
  const { MongoClient } = mongodb;

  const url = 'mongodb://localhost:27017/test_db';

  MongoClient.connect(url, (error, db) => {
    if (error) console.log('Unable to connect to the server', error);

    console.log('Connection established');

    const collection = db.collection('users');

    // eslint-disable-next-line no-shadow
    collection.find({}).toArray((error, result) => {
      if (error) {
        res.send(error);
      } else if (result.length) {
        res.render('userlist', {
          userlist: result,
        });
      } else {
        res.send('No documents found!');
      }

      db.close();
    });
  });
});

router.get('/newuser', (req, res) => {
  res.render('newuser');
});
