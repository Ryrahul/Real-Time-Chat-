const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
app.set("view engine", "ejs");
const users = app.get("/home", (req, res) => {
  res.render("home");
});
server.listen(3001, () => {
  console.log("Server running");
});

io.on("connection", (socket) => {
  socket.emit("requestName");

  socket.on("userName", (name) => {
    users[socket.id] = name;
    const welcomeMessage = `Welcome, ${name}!`;
    socket.emit("message", welcomeMessage);
  });

  socket.on("message", (data) => {
    const Username = users[socket.id];
    socket.broadcast.emit("message", `${Username} messaged : ${data}`);
  });

  socket.on("image", (image) => {
    const Username = users[socket.id];

    socket.broadcast.emit("message", `${Username} sent:`);
    socket.broadcast.emit("image", image);
  });
});
