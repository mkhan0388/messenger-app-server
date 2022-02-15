const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json());

const messages = [
  { username: "ynyn", avatar: "ghngn", message: "gngh" },
  { username: "ynyn", avatar: "ghngn", message: "gngh" },
  { username: "ynyn", avatar: "ghngn", message: "gngh" },
];

io.on("connection", (socket) => {
  console.log("You are connected");
  socket.send(messages);
  socket.on("chat message", (msg) => {
    messages.push(msg);
    io.emit("chat message", messages);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const { PORT = 3000 } = process.env;

server.listen(PORT, () => {
  console.log("listening...");
});

module.exports = app;
