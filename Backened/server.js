// Backend/server.js - WITH STORE ON/OFF FEATURE

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
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://www.jagatstore.in',
    'https://jagatstore.in',
    /\.vercel\.app$/
  ],
  credentials: true
}));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// 🏪 STORE SETTINGS ROUTE - NEW!
app.use('/api/store', require('./routes/storeRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Jagat Store API Running! 🚀',
    version: '1.0.0',
    status: 'active'
  });
});

// Health check for keep-alive
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
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
  console.log(`🔐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔔 Socket.IO ready for real-time notifications`);
  console.log(`📸 Cloudinary upload ready at /api/upload`);
  console.log(`🏪 Store settings ready at /api/store`);
});

// ========================================
// 🔁 KEEP SERVER ALIVE (Render Free Tier)
// ========================================
const https = require('https');
const BACKEND_URL = process.env.BACKEND_URL || 'https://your-backend.onrender.com';

// Ping every 14 minutes to prevent sleep
if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    https.get(`${BACKEND_URL}/health`, (res) => {
      console.log('🔁 Keep-alive ping sent');
    }).on('error', (err) => {
      console.log('Ping error:', err.message);
    });
  }, 14 * 60 * 1000);
}