const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the static HTML file
app.use(express.static(path.join(__dirname, 'public')));

const questions = [
  'What is the capital of France?',
  'Who wrote "Hamlet"?',
  'What is the chemical symbol for water?',
];

let currentQuestionIndex = 0;

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('startGame', () => {
    sendNextQuestion(socket);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

function sendNextQuestion(socket) {
  if (currentQuestionIndex < questions.length) {
    socket.emit('newQuestion', questions[currentQuestionIndex]);
    currentQuestionIndex++;
  } else {
    socket.emit('newQuestion', 'Game over! No more questions.');
  }
}

// Start the server
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
