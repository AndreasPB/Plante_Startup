const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.resolve('public/views/index.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.resolve('public/views/login.html'));
});

router.get('/admin', (req, res) => {
  res.sendFile(path.resolve('public/views/admin.html'));
});

module.exports = router;
