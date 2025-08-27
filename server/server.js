const express = require("express");
const http = require("http");
// const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const options = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
};

// const io = new Server(server, options);
const io = require("socket.io")(server, options);

app.use(express.json());

require("./socket.js").connect(io, PORT);
require("./listen.js").listen(server, PORT);
