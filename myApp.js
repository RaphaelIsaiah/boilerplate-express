require("dotenv").config();

// Setup Express app; initialize an app instance
let express = require("express");
let app = express();

// Root level middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} -  ${req.ip}`);
  next();
});

// Middleware to add current time to the request object
function addCurrentTime(req, res, next) {
  req.time = new Date().toString(); // Attach current time to the request object
  next(); // Pass control to the next middleware
}

// Middleware to send the time as a JSON response
function sendTime(req, res) {
  res.json({ time: req.time }); // Send the time added by the first middleware
}

// Chain the addCurrentTime and sendTime middlewares
app.get("/now", addCurrentTime, sendTime);

// Add the route to serve index.html from the views folder
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// An Echo Server
app.get("/:word/echo", (req, res) => {
  const word = req.params.word; // Capture the route parameter
  res.json({ echo: word }); // Respond with the echoed word in JSON format
});

// An API endpoint
app.get("/name", (req, res) => {
  firstname = req.query.first; // Extract `first` from query parameters
  lastname = req.query.last; // Extract `last` from query parameters
  res.json({ name: `${firstname} ${lastname}` }); // Send the JSON response
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
