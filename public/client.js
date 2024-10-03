const socket = io(); // Initialize socket connection

document.getElementById('start-btn').addEventListener('click', () => {
  socket.emit('startGame', 'Player started the game');
});

// Handle incoming questions from the server
socket.on('newQuestion', (question) => {
  const container = document.getElementById('question-container');
  container.innerHTML = `<p>${question}</p>`;
});
