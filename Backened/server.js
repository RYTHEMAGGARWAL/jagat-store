// Backend/server.js - FIXED: dotenv MUST be first!

// ⚠️ CRITICAL: Load environment variables FIRST before any imports!
const dotenv = require('dotenv');
dotenv.config();

// Now imports will have access to process.env
console.log('🔐 JWT_SECRET loaded:', process.env.JWT_SECRET ? '✅ YES' : '❌ NO');

const orderController = require('./controllers/orderController');
console.log('✅ Order controller loaded');

const promoRoutes = require('./routes/promoRoutes');
const otpRoutes = require('./routes/otpRoutes');

const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const setupSocketIO = require('./utils/socketSetup');
const rateLimit = require('express-rate-limit');

// Connect to database
connectDB();

const app = express();

// ✅ TRUST PROXY - For Render/Vercel/Proxy support
app.set('trust proxy', 1);

const server = http.createServer(app);

// Setup Socket.IO
const { io, notifyAdmins } = setupSocketIO(server);

// Make notifyAdmins available globally
global.notifyAdmins = notifyAdmins;

// ============================================
// 🔒 RATE LIMITING - SECURITY
// ============================================

// General API limit - 100 requests per 15 min
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests, please try again after 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// OTP limit - 5 requests per 15 min
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many OTP requests, please try again after 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Login limit - 10 attempts per 15 min
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many login attempts, please try again after 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Order limit - 20 orders per hour
const orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: 'Too many orders, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// SMS limit - 10 requests per 15 min
const smsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many SMS requests, please try again after 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ============================================
// MIDDLEWARE
// ============================================

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

// ============================================
// 🔒 APPLY RATE LIMITERS
// ============================================

app.use('/api', generalLimiter);

// OTP routes
app.use('/api/auth/send-login-otp', otpLimiter);
app.use('/api/auth/send-register-otp', otpLimiter);
app.use('/api/auth/forgot-password', otpLimiter);
app.use('/api/otp/send', otpLimiter);
app.use('/api/otp/resend', otpLimiter);

// Login routes
app.use('/api/auth/login', loginLimiter);
app.use('/api/auth/register', loginLimiter);
app.use('/api/auth/verify-login-otp', loginLimiter);
app.use('/api/auth/verify-register-otp', loginLimiter);

// Order routes
app.use('/api/orders', orderLimiter);

// SMS routes
app.use('/api/promo/send', smsLimiter);
app.use('/api/promo/test', smsLimiter);

// ============================================
// ROUTES
// ============================================

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// 📢 PROMO SMS ROUTE
app.use('/api/promo', promoRoutes);

// 📱 OTP SMS ROUTE
app.use('/api/otp', otpRoutes);

// 🪔 STORE SETTINGS ROUTE
app.use('/api/store', require('./routes/storeRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Jagat Store API Running! 🚀',
    version: '1.0.0',
    status: 'active',
    sms: 'enabled ✅'
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
  console.log(`🪔 Store settings ready at /api/store`);
  console.log(`📱 SMS Integration enabled:`);
  console.log(`   - OTP Route: /api/otp`);
  console.log(`   - Promo Route: /api/promo`);
  console.log(`🔒 Rate limiting enabled:`);
  console.log(`   - General API: 100 req/15min`);
  console.log(`   - OTP routes: 5 req/15min`);
  console.log(`   - Login routes: 10 req/15min`);
  console.log(`   - Orders: 20 req/hour`);
  console.log(`   - SMS routes: 10 req/15min`);
});

// ========================================
// 🔄 KEEP SERVER ALIVE (Render Free Tier)
// ========================================
const https = require('https');
const BACKEND_URL = process.env.BACKEND_URL || 'https://your-backend.onrender.com';

if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    https.get(`${BACKEND_URL}/health`, (res) => {
      console.log('🔄 Keep-alive ping sent');
    }).on('error', (err) => {
      console.log('Ping error:', err.message);
    });
  }, 14 * 60 * 1000);
}