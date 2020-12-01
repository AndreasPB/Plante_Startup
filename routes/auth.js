const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");
// const nodemailer = require("nodemailer")
// const bodyParser = require('body-parser');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // limit each IP to 100 requests per windowMs
});

router.use("/login", limiter);

router.post('/register', async (req, res) => {
  // Validating the data before we get an user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the user is already in DB
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already exists');

  // Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Creating new user
  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email,
  });
  try {
    await user.save();

    const email = req.body.email;

    // MAILER
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
      },
    });


    const message = {
      from: 'Plante Startup <foo@example.com>', // sender address
      to: `${email}`,
      subject: "Plante Startup Account",
      text: "Your new account has been created!",
  };

    let info = await transporter.sendMail(message);

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.redirect('/login');
  } catch (err) {
    res.status(400).send(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  // Validating the data before we get an user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't exist");
  // Checking if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  req.session.isAuth = true;
  console.log(`User ${ user.username } has logged in`);
  res.status(200).redirect('/')
});

// LOGOUT
router.post('/logout', async (req, res) => {
  req.session.destroy((error) => {
    if(error) throw error;
    console.log(`User ${ user.username } has logged out`);
    res.redirect('/');
  })
});

module.exports = router;
