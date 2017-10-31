const path = require("path");
const express = require("express");

const PUBLIC_PATH = path.join(__dirname, "../public");
const PORT = process.env.PORT || 3002;

var app = express();

// Setup express to access the public folder
app.use(express.static(PUBLIC_PATH));

// Starting express server
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});