$(document).ready(function() {

    var socket = io();

    socket.on("connect", function() {
        console.log("Connected to the server");

        /*socket.emit("createMessage", {
            from: "Vineet",
            text: "Nothing much"
        })*/

    });

    socket.on("newMessage", function(message) {
        $("#chat").append($("<li><b>" + message.from + ": </b>" + message.text + "</li>"));
    });

    socket.on("disconnect", function() {
        console.log("Disconnected from the server");
    });

    $("#message-form").on("submit", function(e) {
        e.preventDefault();
        socket.emit("createMessage", {
            from: $("#name").val() || "User",
            text: $("#message").val()
        });
    });

});