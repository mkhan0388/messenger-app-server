const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
	res.send("Welcome to the chat room");
});

const messages = [{ username: "", message: "" }];

io.on("connection", (socket) => {
	console.log("You are connected");
	socket.on("chat message", (msg) => {
		messages.push(msg);
		io.emit("chat message", messages);
	});
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

server.listen(3000, () => {
	console.log("listening...");
});
