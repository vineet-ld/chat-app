const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const message = require("./utils/message");

const PUBLIC_PATH = path.join(__dirname, "../public");
const PORT = process.env.PORT || 3002;

var app = express();

// Setup express to access the public folder
app.use(express.static(PUBLIC_PATH));

// Setup http server manually
var server = http.createServer(app);

// Setup Socket.io
var io = socketIO(server);

// Socket.io event handlers
io.on("connection", (socket) => {
    console.log("Connected to the client");

    socket.emit("newMessage", message.generate("Admin", "Welcome to the chat app"));

    socket.broadcast.emit("newMessage", message.generate("Admin", "New user joined"));

    // Event handler for create message
    socket.on("createMessage", (message) => {
        console.log("New message created", message);

        // Emitting an event new message
        io.emit("newMessage", message.generate(message.from, message.text));
    });

    socket.on("disconnect", () => {
        console.log("Disconnected from the client");
    });
});

// Starting express server
server.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});