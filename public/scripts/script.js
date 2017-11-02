$(document).ready(function() {

    var socket = io();

    socket.on("connect", function() {
        console.log("Connected to the server");
    });

    socket.on("newMessage", function(message) {
        $("#messages").append($("<li><b>" + message.from + ": </b>" + message.text + "</li>"));
    });

    socket.on("newLocationMessage", function(message) {
        $("#messages").append($("<li><b>" + message.from + ": </b><a href='" + message.url + "' target='_blank'>My Location</a></li>"));
    });

    socket.on("disconnect", function() {
        console.log("Disconnected from the server");
    });

    $("#message-form").on("submit", function(e) {
        e.preventDefault();
        socket.emit("createMessage", {
            from: $("#name").val() || "User",
            text: $("#message").val()
        }, function() {
            $("#message").val("");
        });

    });

    $("#send-location").on("click", function() {

        if(!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
        }

        $("#send-location").attr("disabled", "disabled").text("Sending...");

        navigator.geolocation.getCurrentPosition(function(position) {
            socket.emit("locationMessage", {
                from: $("#name").val() || "User",
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
            $("#send-location").removeAttr("disabled").text("Send Location");
        }, function () {
            alert("Unable to retrieve geolocation");
            $("#send-location").removeAttr("disabled").text("Send Location");
        });

    });

});