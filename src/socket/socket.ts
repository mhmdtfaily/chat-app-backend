import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { CORS_CREDENTIALS, CORS_ORIGIN } from "../config";

export const initializeSocket = (server: HttpServer) => {
  // Initialize Socket.IO
  const io = new SocketIOServer(server, {
    cors: {
      origin: CORS_ORIGIN,
      methods: ["GET", "POST"],
      credentials: CORS_CREDENTIALS,
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");
  
    socket.on("message", (msg) => {
      try {
        io.emit("message", msg);
      } catch (err) {
        console.error("Error handling message event", err);
      }
    });
  
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  
    socket.on("error", (err) => {
      console.error("Socket.IO error", err);
    });
  });
  
  return io;
};
