const router = require('express').Router();
const path = require('path');
const verify = require('./verifyAuth');

router.get('/', (req, res) => {
  res.sendFile(path.resolve('public/views/index.html'));
});

router.get('/about', (req, res) => {
  res.sendFile(path.resolve('public/views/about.html'));
});

router.get('/contact', (req, res) => {
  res.sendFile(path.resolve('public/views/contact.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.resolve('public/views/login.html'));
});

router.get('/regUser', verify, (req, res) => {
  res.sendFile(path.resolve('public/views/register_user.html'));
});

router.get('/regItem', verify, (req, res) => {
  res.sendFile(path.resolve('public/views/register_item.html'));
});

router.get('/updateItem', verify, (req, res) => {
  res.sendFile(path.resolve('public/views/update_item.html'));
});

router.get('/updateUser', verify, (req, res) => {
  res.sendFile(path.resolve('public/views/update_user.html'));
});

router.get('/admin', verify, (req, res) => {
  res.sendFile(path.resolve('public/views/admin.html'));
});

module.exports = router;
