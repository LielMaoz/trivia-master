const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

require('dotenv').config();

const User = require('./User');
const Room = require('./Room');

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*', //http://localhost:3000',
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
                .json({ success: false, message: 'Invalid email or password' });
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

io.on('connection', (socket) => {
    console.log(`user connected: ${socket.id}`);

    socket.on('join_room', (roomId) => {
        console.log(`User with ID ${socket.id} joined room: ${roomId}`);
        socket.join(roomId);
        const room = io.sockets.adapter.rooms.get(roomId);
        console.log(`There are ${room.size} players in room ${roomId}`);
        //socket.emit('message', 'You have joined the room');
        socket
            .to(roomId)
            .emit('user_joined', `User ${socket.id} joined the room.`);
    });

    // Listen for chat messages
    socket.on('chat_message', (data) => {
        const { roomId, message, username } = data;
        console.log(`Message in room ${roomId}: ${message} (from ${username})`);
        const room = io.sockets.adapter.rooms.get(roomId);

        // Log the number of players in the room
        console.log(
            `Message "${message}" sent to ${
                room ? room.size : 0
            } players in room ${roomId}`
        );

        // Broadcast the message to the room
        io.to(roomId).emit('chat_message', { username, message });
        console.log(`Message broadcasted to room ${roomId}: ${message}`);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

httpServer.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});

//Connecting to a room
app.post('/api/room/add-player', async (req, res) => {
    try {
        const { username, roomId } = req.body;
        if (!username || !roomId) {
            return res.status(400).json({
                success: false,
                message: 'Username and Room ID are required.',
            });
        }
        // Find the room by ID
        const room = await Room.findOne({ roomId });
        if (!room) {
            return res
                .status(404)
                .json({ success: false, message: 'Room not found' });
        }
        const player = await User.findOne({ username: username });
        if (!player) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if the user is already in the room
        if (room.players.includes(player._id)) {
            return res.status(400).json({
                success: false,
                message: 'Player is already in the room.',
            });
        }

        // If room is not full, add the player
        if (room.players.length <= 4) {
            room.players.push(player._id); // Add the player to the room
            await room.save();
            return res
                .status(200)
                .json({ success: true, message: 'Player added successfully!' });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Room is full. Cannot add more players.',
            });
        }
    } catch (error) {
        console.error('Error adding player:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
        });
    }
});

//Creating a new room and adding to the schema
app.post('/api/room/create', async (req, res) => {
    try {
        //console.log('Incoming Request Body:', req.body); // Log to check the request body

        const { roomName, creatorName } = req.body;
        /*console.log(
            `Creating room with name: ${roomName} and creator: ${creatorName}`
        );*/
        const creator = await User.findOne({ username: creatorName });
        if (!creator) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if a room with the same name already exists
        const existingRoom = await Room.findOne({ roomName });
        if (existingRoom) {
            return res.status(400).json({
                success: false,
                message:
                    'Room with this name already exists. Please choose a different name.',
            });
        }

        // Create a new room
        const newRoom = new Room({
            roomId: randomRoomid(),
            roomName,
            players: [], //creator._id], // Creator starts as the first player
            roomScore: 0,
            isPlaying: false,
        });
        //newRoom.players.push(creator._id);
        // Save the new room to the database
        await newRoom.save();

        res.status(201).json({
            success: true,
            message: 'Room created successfully!',
            roomId: newRoom.roomId,
        });
    } catch (err) {
        console.error('Error creating room:', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
        });
    }
});

function randomRoomid() {
    return Math.floor(100000 + Math.random() * 900000); /* 6 digits */
}
