// Backend/routes/authRoutes.js - With OTP-based Registration & Login

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { 
  // Existing functions
  forgotPassword,
  verifyOTP,
  resetPassword,
  // NEW OTP functions
  sendRegisterOtp,
  verifyRegisterOtp,
  sendLoginOtp,
  verifyLoginOtp
} = require('../controllers/authController');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// 🍪 Cookie configuration for WebView
const COOKIE_OPTIONS = {
  httpOnly: false,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
  maxAge: 30 * 24 * 60 * 60 * 1000,
  path: '/'
};

// ============================================================
// 📱 OTP-BASED REGISTRATION ROUTES (NEW)
// ============================================================

// @route   POST /api/auth/send-register-otp
// @desc    Send OTP to phone for registration
// @access  Public
router.post('/send-register-otp', sendRegisterOtp);

// @route   POST /api/auth/verify-register-otp
// @desc    Verify OTP and complete registration
// @access  Public
router.post('/verify-register-otp', verifyRegisterOtp);

// ============================================================
// 📱 OTP-BASED LOGIN ROUTES (NEW)
// ============================================================

// @route   POST /api/auth/send-login-otp
// @desc    Send OTP to phone for login
// @access  Public
router.post('/send-login-otp', sendLoginOtp);

// @route   POST /api/auth/verify-login-otp
// @desc    Verify OTP and login
// @access  Public
router.post('/verify-login-otp', verifyLoginOtp);

// ============================================================
// 🔐 PASSWORD-BASED AUTH ROUTES (Existing - for backward compatibility)
// ============================================================

// @route   POST /api/auth/register
// @desc    Register user with password
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all fields'
      });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      const field = existingUser.email === email ? 'Email' : 'Phone number';
      return res.status(400).json({
        success: false,
        message: `${field} already registered`
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role: 'user'
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.cookie('token', token, COOKIE_OPTIONS);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field === 'phone' ? 'Phone number' : 'Email'} already registered`
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user with email & password
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔐 Login attempt for:', email);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if user has password (OTP registered users might not)
    if (!user.password) {
      return res.status(401).json({
        success: false,
        message: 'Please login with OTP. No password set for this account.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.cookie('token', token, COOKIE_OPTIONS);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isPhoneVerified: user.isPhoneVerified
      }
    });

    console.log('✅ Login successful for:', email);
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', async (req, res) => {
  try {
    let token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isPhoneVerified: user.isPhoneVerified
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

// @route   GET & POST /api/auth/logout
// @desc    Logout user
// @access  Public


// ============================================================
// 🔑 FORGOT PASSWORD ROUTES (Email OTP - Existing)
// ============================================================

// @route   POST /api/auth/forgot-password
// @desc    Send OTP to email for password reset
// @access  Public
router.post('/forgot-password', forgotPassword);

// @route   POST /api/auth/verify-otp
// @desc    Verify email OTP
// @access  Public
router.post('/verify-otp', verifyOTP);

// @route   POST /api/auth/reset-password
// @desc    Reset password with OTP
// @access  Public
router.post('/reset-password', resetPassword);

// ============================================================
// 🔧 UTILITY ROUTES
// ============================================================

// @route   POST /api/auth/set-password
// @desc    Set password for OTP-registered users
// @access  Private
router.post('/set-password', async (req, res) => {
  try {
    let token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Please login first'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    // Hash and save new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({
      success: true,
      message: 'Password set successfully. You can now login with email & password.'
    });

  } catch (error) {
    console.error('Set password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to set password'
    });
  }
});

// @route   POST /api/auth/check-phone
// @desc    Check if phone number exists
// @access  Public
router.post('/check-phone', async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone || !/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit phone number'
      });
    }

    const user = await User.findOne({ phone });
    
    res.json({
      success: true,
      exists: !!user,
      message: user ? 'Phone number is registered' : 'Phone number is not registered'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// 🚪 LOGOUT ROUTE
router.post('/logout', (req, res) => {
  res.cookie('token', '', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    expires: new Date(0),
    path: '/'
  });
  
  res.clearCookie('token');
  
  console.log('🚪 User logged out');
  
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;