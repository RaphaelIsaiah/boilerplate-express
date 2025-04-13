require("dotenv").config();

const bodyParser = require("body-parser");

// Setup Express app; initialize an app instance
let express = require("express");
let app = express();

// Mount body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Root level middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} -  ${req.ip}`);
  next();
});

//  Example route to handle POST requests
app.post("/example", (req, res) => {
  res.json({ name: req.body.name, age: req.body.age });
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
app
  .route("/name")
  .get((req, res) => {
    const firstName = req.query.first; // Extract from query string
    const lastName = req.query.last; // Extract from query string
    res.json({ name: `${firstName} ${lastName}` });
  })
  .post((req, res) => {
    const firstName = req.body.first; // Extract from request body
    const lastName = req.body.last; // Extract from request body
    res.json({ name: `${firstName} ${lastName}` });
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
