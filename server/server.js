const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

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

    // Event handler for create message
    socket.on("createMessage", (message) => {
        console.log("New message created", message);

        // Emitting an event new message
        socket.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    });

    socket.on("disconnect", () => {
        console.log("Disconnected from the client");
    });
});

// Starting express server
server.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});