const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: ["http://localhost:5500"],
    methods: ["GET", "POST"]
  },
});
const messages = [];

io.on("connection", (socket) => {
  socket.emit('server_send_message_current', messages)
  socket.on("client_send_message", (data) => {
    console.log(data)
    messages.push(data)
    io.emit('server_send_message', data)
  });
});

io.listen(3000);