const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);

const app = express();

const PORT = process.env.PORT || 8080;

// Import Routes
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const viewRoute = require('./routes/views');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}, () => {
  console.log('Connected to MongoDB!');
});

const store = new MongoDBSession({
  uri: process.env.DB_CONNECT,
  collection: 'mySessions',
})

// Middlewares
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(session({
  secret: process.env.TOKEN_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
}));

// Route Middelwares
app.use('/', viewRoute);
app.use('/api/posts', postsRoute);
app.use('/api/user', authRoute);
app.use('/api/admin', adminRoute);

app.listen(PORT, (error) => {
  if (error) {
    console.log(`Server start on port ${PORT} failed!`);
    console.log(error);
  }
  console.log(`Server up and running on port ${PORT}!`);
});
