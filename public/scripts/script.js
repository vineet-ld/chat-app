(function() {

    var socket = io();

    socket.on("connect", function() {
        console.log("Connected to the server");

        socket.emit("createMessage", {
            from: "Vineet",
            text: "Nothing much"
        })

    });

    socket.on("newMessage", function(message) {
        console.log("New Message", message);
    });

    socket.on("disconnect", function() {
        console.log("Disconnected from the server");
    });

})();