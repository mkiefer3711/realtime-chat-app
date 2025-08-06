const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const rooms = {};

io.on('connection', (socket) => {
  socket.on('join_room', ({ room, username }) => {
    socket.join(room);
    socket.username = username;
    socket.room = room;

    if (!rooms[room]) rooms[room] = [];
    io.to(room).emit('chat_history', rooms[room]);
  });

  socket.on('send_message', ({ room, username, message }) => {
    const msg = { username, message };
    rooms[room].push(msg);
    io.to(room).emit('receive_message', msg);
  });

  socket.on('disconnect', () => {
  });
});

server.listen(3001, () => console.log('Server running on port 3001'));