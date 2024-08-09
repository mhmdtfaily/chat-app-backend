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

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room ${roomId}`);
    });

    socket.on("message", (msg, roomId) => {
      io.to(roomId).emit("message", msg); // Send the message only to clients in the room
      io.emit("newMessage", { roomId, msg }); // Notify all users of a new message
      console.log(`message ${roomId} ${msg}`);
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
