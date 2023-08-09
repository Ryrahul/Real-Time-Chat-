const express = require("express");
const app = express();
const server = require("http").createServer(app);
const fs = require("fs");
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.set("view engine", "ejs");

app.get("/home", (req, res) => {
  res.render("home");
});
server.listen(3001, () => {
  console.log("Server running");
});

io.on("connection", (socket) => {
  console.log(`UserId: ${socket.id}`);

  socket.on("message", (data) => {
    socket.broadcast.emit("message", `${socket.id} messaged : ${data}`);
  });

  socket.on("image", (image) => {
    socket.broadcast.emit("message", `${socket.id} sent:`);
    socket.broadcast.emit("image", image);
  });
});
