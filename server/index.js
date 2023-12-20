// app.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/messages.js";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

// const httpServer = createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  socket.on("add-user", (userId) => {
    handleAddUser(socket, userId);
  });

  socket.on("send-msg", (data) => {
    handleSendMessage(socket, data);
  });

  socket.on("logout", (userId) => {
    handleLogOut(socket, userId);
  })
});

function handleAddUser(socket, userId) {
  const existingUser = onlineUsers.find((item) => item.userId === userId);

  if (existingUser) {
    existingUser.socketId = socket.id;
  } else {
    onlineUsers.push({ userId, socketId: socket.id });
  }
  io.emit("onlineUsers", onlineUsers);
  console.log(onlineUsers)
}

function handleSendMessage(socket, data) {
  const sendUserSocket = onlineUsers.find((item) => item.userId === data.to);
  console.log(data, sendUserSocket.socketId, onlineUsers)
  if (sendUserSocket) {
    socket.to(sendUserSocket.socketId).emit("receive", data.msg);
  }
}

function handleLogOut(socket, userId){
  const userIndex = onlineUsers.findIndex((item)=> item.userId === userId);
  if(userIndex !== -1){
    let  userSocketId = onlineUsers[userIndex].socketId;
    onlineUsers = onlineUsers.filter((item) => item.socketId !== userSocketId);
    io.emit("onlineUsers", onlineUsers);
  }
}
