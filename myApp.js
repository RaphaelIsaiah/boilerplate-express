let express = require("express");
let app = express();

// Add the route to serve "Hello Express"
app.get("/", function (req, res) {
  res.send("Hello Express");
});

console.log("Hello World");
module.exports = app;
