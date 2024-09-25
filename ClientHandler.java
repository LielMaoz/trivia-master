import java.io.*;
import java.net.*;

class ClientHandler implements Runnable {
    private Socket socket;

    public ClientHandler(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {
        try (BufferedReader input = new BufferedReader(new InputStreamReader(socket.getInputStream()));
             PrintWriter output = new PrintWriter(socket.getOutputStream(), true)) {
            String message;
            output.println("Hello, you are connected to the server!");
            while ((message = input.readLine()) != null) {
                System.out.println("Received: " + message);
                if (message.equalsIgnoreCase("hello")) {
                    output.println("Hello from the server!");
                } else {
                    output.println("Unknown message");
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
