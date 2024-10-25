const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const User = require('./User');

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

/*****move the password to somewhere else */
const URL =
  'mongodb+srv://Shiri1012:YcMMvX6SqpNshzca@users.klgoj.mongodb.net/?retryWrites=true&w=majority&appName=users';

mongoose.connect(URL).then(() => console.log('MongoDB connected'));

app.post('/api/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'This email is already registered. Please log in instead.',
        loginLink: '/Login',
      });
    }
    const user = await User.create({
      email,
      username,
      password /*** we should hash the password before saving it! ***/,
    });
    res
      .status(201)
      .json({ success: true, message: 'User registrated successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email, password });
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: true, message: 'Invalid email or password' });
    }
    res
      .status(200)
      .json({ success: true, message: 'User logged in successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});
// Start the server
httpServer.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
