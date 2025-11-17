const orderController = require('./controllers/orderController');
console.log('✅ Order controller loaded from:', __dirname + '/controllers/orderController.js');

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const setupSocketIO = require('./utils/socketSetup');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
const server = http.createServer(app);

// Setup Socket.IO
const { io, notifyAdmins } = setupSocketIO(server);

// Make notifyAdmins available globally
global.notifyAdmins = notifyAdmins;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    /\.vercel\.app$/  // Allow all Vercel domains
  ],
  credentials: true
}));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Jagat Store API Running! 🚀',
    version: '1.0.0',
    status: 'active'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`✅ MongoDB Connected Successfully`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔔 Socket.IO ready for real-time notifications`);
});