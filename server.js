const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRouter = require('./routes/userRoutes');
const documentRouter = require('./routes/documentRoutes');
const setupSockets = require('./sockets/documentSocket');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRouter);
app.use('/api/documents', documentRouter);

// WebSocket Setup
setupSockets(io);

// Server Start
const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  try {
    await sequelize.sync();
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection error:', err);
  }
});
