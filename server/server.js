const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

require('dotenv').config();

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
const URL = process.env.MONGODB_URL;
mongoose.connect(URL).then(() => console.log('MongoDB connected'));

app.post('/api/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const existingUserEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

        if (existingUserEmail) {
            return res.status(400).json({
                success: false,
                message:
                    'This email is already registered. Please log in instead.',
                loginLink: '/Login',
            });
        }

        if (existingUsername) {
            return res.status(400).json({
                success: false,
                message:
                    'Looks like someone is already using that username. Please choose a different one.',
                loginLink: '/Login',
            });
        }

        const user = await User.create({
            email,
            username,
            password /*** we should hash the password before saving it! ***/,
        });
        res.status(201).json({
            success: true,
            message: 'User registrated successfully!',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
        });
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
        res.status(200).json({
            success: true,
            username: existingUser.username,
            message: 'User logged in successfully!',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
        });
    }
});

app.post('/api/score', async (req, res) => {
    try {
        const { email, score } = req.body;
        const userFromDb = await User.findOne({ email });

        if (!userFromDb) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        if (userFromDb.score < score) {
            userFromDb.score = score;
            await userFromDb.save();
            return res.status(200).json({
                success: true,
                message: 'User highest score updated successfully!',
            });
        } else {
            return res.status(200).json({
                success: true,
                message:
                    'Score is not higher than current highest score, no update made.',
            });
        }
    } catch (err) {
        console.error('Error updating score: ', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
        });
    }
});

app.get('/api/top-scores', async (req, res) => {
    try {
        const topScores = await User.find({})
            .sort({ score: -1 }) // Sort by score in descending order
            .limit(10) // Limit to top 10 results
            .select('username score'); // Select only username and score fields

        res.status(200).json({
            success: true,
            data: topScores,
        });
    } catch (error) {
        console.error('Error fetching top scores:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving top scores.',
        });
    }
});

httpServer.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});

function randomRoomid() {
    return Math.floor(100000 + Math.random() * 900000); /* 6 digits */
}
