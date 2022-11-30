const express = require("express");

const cors = require("cors");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname + "/app.js")));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function () {
  console.log("Server is running on localhost3000");
});
