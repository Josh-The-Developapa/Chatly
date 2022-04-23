const app = require("express")();
const server = require("http").createServer(app);
const router = require("./routes");
const {
  getCurrentUser,
  getRoomUsers,
  userJoin,
  userLeave,
  users,
} = require("./users");

const botName = "Chatly Bot";

app.use(router);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected", socket.id, socket.connected);

  socket.on("joinRoom", ({ name, room }) => {
    const user = userJoin(socket.id, name, room);
    socket.join(user.room);

    socket.broadcast
      .to(user.room)
      .emit("message", `${user.name} joined the chat`);
  });

  socket.on("chat", (payload) => {
    console.log(payload);
    io.emit("chat", payload);
  });
});

server.listen(5000, () => {
  console.log("Server is listening at port 5000...");
});
