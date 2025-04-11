let express = require("express");
let app = express();

// Add the route to serve "Hello Express"
app.get("/", function (req, res) {
  // res.send("Hello Express");
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/json", function (req, res) {
  res.json({ message: "Hello json" });
});
app.use("/public", express.static(__dirname + "/public"));
// console.log("Hello World");
module.exports = app;
