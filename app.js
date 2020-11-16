const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

// Middlewares
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Import Routes
const postsRoute = require('./routes/posts');
// const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');

// Route Middelwares
app.use('/posts', postsRoute);
// app.use('/users', usersRoute);
app.use('/api/user', authRoute);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/fragments/header.html')
  + path.join(__dirname, './public/index.html')
  + path.join(__dirname, './public/fragments/footer.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, './public/login.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, './public/admin.html'));
});

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => {
  console.log('Connected to DB!');
});

app.listen(PORT, (error) => {
  if (error) {
    console.log(`Server start on port ${PORT} failed!`);
    console.log(error);
  }
  console.log(`Server up and running on port ${PORT}!`);
});
