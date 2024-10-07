class ClientHandler {
    constructor() {
      this.socket = null;
    }
  
    // Function to connect to the WebSocket server
    connect() {
      this.socket = new WebSocket('ws://localhost:3000');
  
      // On successful connection
      this.socket.onopen = () => {
        console.log('Connected to the server');
        this.sendMessage('Hello Server!'); // Send a message to the server
      };
  
      // On receiving a message from the server
      this.socket.onmessage = (event) => {
        console.log(`Message from server: ${event.data}`);
        // You can update the UI with the received message here
      };
  
      // On connection close
      this.socket.onclose = () => {
        console.log('Disconnected from the server');
      };
    }
  
    // Function to send a message to the server
    sendMessage(message) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(message);
      } else {
        console.log('Socket is not open. Unable to send message.');
      }
    }
  }
  
  // Create an instance of ClientHandler and connect
  const clientHandler = new ClientHandler();
  clientHandler.connect(); // Establish the connection
  