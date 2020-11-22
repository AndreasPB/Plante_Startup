const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

// Import Routes
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');

dotenv.config();

const PORT = process.env.PORT || 8080;

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}, () => {
  console.log('Connected to DB!');
});

// Middlewares
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Route Middelwares
app.use('/posts', postsRoute);
app.use('/api/user', authRoute);
app.use('/api/admin', adminRoute);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/fragments/header.html')
  + path.join(__dirname, './public/index.html')
  + path.join(__dirname, './public/fragments/footer.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, './public/login.html'));
});

/*
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, './public/admin.html'));
});
*/

app.listen(PORT, (error) => {
  if (error) {
    console.log(`Server start on port ${PORT} failed!`);
    console.log(error);
  }
  console.log(`Server up and running on port ${PORT}!`);
});
