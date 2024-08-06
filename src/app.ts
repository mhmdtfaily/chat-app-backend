import express from "express";
import cors from "cors";
import http from "http";

// Import routes and middlewares
import healthcheckRoute from "./routes/health-check.route";
import user from "./routes/user.route";
import chat from "./routes/chat.route";
import errorMiddleware from "./middlewares/error.middleware";

// Import Socket.io initialization
import { initializeSocket } from "./socket/socket";

// Configuration
import { PORT, CORS_CREDENTIALS, CORS_ORIGIN } from "./config";

try {
  // Initialize Express
  const app: express.Application = express();
  const server = http.createServer(app);

  // Middleware setup
  app.use(express.json());
  app.use(cors({ origin: CORS_ORIGIN, credentials: CORS_CREDENTIALS }));
  app.use(express.urlencoded({ extended: true }));

  // API Routes
  app.use("/health-check", healthcheckRoute);
  app.use("/user", user);
  app.use("/chat", chat);

  // Error handling middleware
  app.use(errorMiddleware);

  // Initialize Socket.IO
  initializeSocket(server);

  // Start the server
  const port = PORT || 3000;
  server.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
  });
} catch (e) {
  console.log(`Error on listening at http://localhost: ${e}`);
}
