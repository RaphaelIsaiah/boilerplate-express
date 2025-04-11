// Setup Express app; initialize an app instance
let express = require("express");
let app = express();

// Add the route to serve index.html from the views folder
app.get("/", function (req, res) {
  // res.send("Hello Express");
  res.sendFile(__dirname + "/views/index.html");
});

// Add route to serve static files from the public folder
app.use("/public", express.static(__dirname + "/public"));

// Add the get route for /json
app.get("/json", function (req, res) {
  res.json({ message: "Hello json" });
});

// console.log("Hello World");

// Export the app object to enable integration with other files (like server.js)
module.exports = app;
