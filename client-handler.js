class ClientHandler {
    constructor(ws) {
      this.socket = ws;
  
      // Handle incoming messages
      this.socket.on('message', (message) => {
        console.log(`Received message: ${message}`);
        // You can handle messages here
      });
  
      // Handle connection close
      this.socket.on('close', () => {
        console.log('Client disconnected');
      });
    }
  
    // Function to send a message to the client
    sendMessage(message) {
      if (this.socket && this.socket.readyState === this.socket.OPEN) {
        this.socket.send(message);
      }
    }
  }
  
  module.exports = ClientHandler;