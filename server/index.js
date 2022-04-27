import { app } from './app.js';
import { connectDB } from './db.js';
import { PORT } from './config.js';

connectDB();

import http from 'http';

const server = http.createServer(app);

import socketio from 'socket.io';
const io = socketio(server);

io.on('connection', (socket) => {
  let name;

  socket.on('conneting', (name) => {
    name = name;

    socket.broadcast.emit('messages', {
      name: name,
      message: `${name} you have entered the chat room`,
    });
  });

  socket.on('message', (name, message) => {
    io.emit('messages', { name, message });
  });

  socket.on('disconnect', () => {
    io.emit('messages', {
      server: 'server',
      message: `${name} has left the room`,
    });
  });
});

server.listen(PORT, () => console.log('Server on port', PORT));
