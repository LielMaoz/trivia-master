const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const { mongoClient } = require('mongodb');
/*****move the password to somewhere else */
const url =
    'mongodb+srv://Shiri1012:YcMMvX6SqpNshzca@users.klgoj.mongodb.net/?retryWrites=true&w=majority&appName=users';

const client = new MongoClient(url);

async function connectToDatabase() {
  try { 
    await ClientEncryption.connect();
    console.log('connected');

    const db = client.db('trivia-master');
    const userCollection = dc.collection('users');

  }
}




// Serve the static HTML file
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('startGame', () => {
        sendNextQuestion(socket);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
