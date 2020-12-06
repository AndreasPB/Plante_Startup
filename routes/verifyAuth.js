const cookieParser = require('cookie-parser');
const express = require('express');

const app = express();
app.use(cookieParser());

module.exports = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.status(401).redirect('/login');
  }
};
