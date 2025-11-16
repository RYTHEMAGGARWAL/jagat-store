// Socket.io setup for real-time notifications
// Add this to your backend server.js

const setupSocketIO = (server) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  // Store connected admin sockets
  const adminSockets = new Map();

  io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id);

    // Register as admin
    socket.on('register-admin', (adminId) => {
      adminSockets.set(adminId, socket.id);
      console.log('👤 Admin registered:', adminId);
    });

    // Unregister on disconnect
    socket.on('disconnect', () => {
      // Remove from admin list
      for (const [adminId, socketId] of adminSockets.entries()) {
        if (socketId === socket.id) {
          adminSockets.delete(adminId);
          console.log('👤 Admin disconnected:', adminId);
          break;
        }
      }
      console.log('🔌 Client disconnected:', socket.id);
    });
  });

  // Function to notify all admins
  const notifyAdmins = (event, data) => {
    console.log(`📢 Broadcasting to ${adminSockets.size} admins:`, event);
    adminSockets.forEach((socketId) => {
      io.to(socketId).emit(event, data);
    });
  };

  return { io, notifyAdmins };
};

module.exports = setupSocketIO;