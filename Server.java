import java.io.*;
import java.net.*;
import java.util.concurrent.*;

public class Server {
    private static final int PORT = 12345;
    private static final ExecutorService executor = Executors.newCachedThreadPool();

    public static void main(String[] args) {
        // Thread for listening to system commands
        executor.submit(() -> {
            BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
            String command;
            try {
                while (!(command = reader.readLine()).equalsIgnoreCase("exit")) {
                    System.out.println("Unknown command: " + command);
                }
                System.out.println("Shutting down the server...");
                executor.shutdownNow();
            } catch (IOException e) {
                e.printStackTrace();
            }
        });

        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            System.out.println("Server is listening on port " + PORT);
            while (!executor.isShutdown()) {
                Socket socket = serverSocket.accept();
                executor.submit(new ClientHandler(socket));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
