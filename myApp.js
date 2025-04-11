require("dotenv").config();

// Setup Express app; initialize an app instance
let express = require("express");
let app = express();

// Root level middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} -  ${req.ip}`);
  next();
});

// Add the route to serve index.html from the views folder
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Add route to serve static files from the public folder
app.use("/public", express.static(__dirname + "/public"));

// Add the get route for /json
app.get("/json", function (req, res) {
  // Access MESSAGE_STYLE and transform message if it equals "uppercase"
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message: message });
});

// Export the app object to enable integration with other files (like server.js)
module.exports = app;
