const router = require('express').Router();
const path = require('path');
const auth = require('./auth');
const verify = require('./verifyAuth');
const cookieParser = require('cookie-parser');


router.get('/', (req, res) => {
  res.sendFile(path.resolve('public/views/index.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.resolve('public/views/login.html'));
});

router.get('/register', verify, (req, res) => {
  res.sendFile(path.resolve('public/views/register.html'));
});

router.get('/admin', verify, (req, res) => {
  res.sendFile(path.resolve('public/views/admin.html'));
});

module.exports = router;
