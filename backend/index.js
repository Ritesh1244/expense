const express = require("express");
const cors = require("cors");
const { db } = require("./db/db"); // Import the db function
const { readdirSync } = require("fs");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000; // Change the port number to one that is available

// middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World");
});

// router

readdirSync("./routes").map((route) =>
  app.use("/api/vi", require("./routes/" + route))
);

const server = () => {
  db(); // Call the db function to connect to the database
  app.listen(PORT, () => {
    console.log("Listening to port:", PORT);
  });
};

server();
