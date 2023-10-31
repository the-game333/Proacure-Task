// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;
var cors = require('cors')

app.use(cors())

app.use(bodyParser.json());
mongoose.set("strictQuery", false);
// Connect to MongoDB
mongoose.connect('yourmongoURL', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Generate a random secret for each user
function generateSecret() {
  return speakeasy.generateSecret({ length: 20 }).base32;
}

// Send email with OTP
function sendOTP(email, otp) {
    console.log("inside node mailll");
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'abhaypawar596@gmail.com',
      pass: 'oetk qgmt yyjt rvvy',
    },
  });

  const mailOptions = {
    from: 'Abhay',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// Register a new user
app.post('/register', async (req, res) => {
  try {
    const { email,name } = req.body;
    const secret = generateSecret();

    const newUser = new User({email, secret });
    await newUser.save();
    const otp = speakeasy.totp({
        secret: newUser.secret,
        encoding: 'base32'
      });
      console.log(otp)
      sendOTP(email, otp);

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Request OTP for login
app.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    const newUser = await User.findOne( email );

    if (!newUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify OTP
app.post('/verify', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const newUser = await User.findOne( {email} );
   if (!newUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValidOTP = speakeasy.totp.verify({
      secret: newUser.secret,
      encoding: 'base32',
      token: otp
    });
    
    if (isValidOTP) {
      res.status(401).json({ message: 'Invalid OTP' });
    } else {
      res.json({ message: 'OTP is valid' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
