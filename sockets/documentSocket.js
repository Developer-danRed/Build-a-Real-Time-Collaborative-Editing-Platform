const setupSockets = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinDocument', (documentId) => {
      socket.join(documentId);
      console.log(`User joined document: ${documentId}`);
    });

    socket.on('editDocument', (data) => {
      const { documentId, content } = data;
      socket.to(documentId).emit('documentEdited', { content });
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};

module.exports = setupSockets;
