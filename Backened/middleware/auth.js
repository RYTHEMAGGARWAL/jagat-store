// // Backend/middleware/auth.js - Authentication Middleware

// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// const auth = async (req, res, next) => {
//   try {
//     // Get token from header
//     let token = req.header('Authorization');
    
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: 'No token, authorization denied'
//       });
//     }

//     // Remove Bearer from token
//     if (token.startsWith('Bearer ')) {
//       token = token.slice(7, token.length);
//     }

//     // Verify token
//     const decoded = jwt.verify(token, JWT_SECRET);

//     // Get user from token
//     const user = await User.findById(decoded.id).select('-password');

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: 'User not found'
//       });
//     }

//     // Add user to request
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error('Auth middleware error:', error);
//     res.status(401).json({
//       success: false,
//       message: 'Token is not valid'
//     });
//   }
// };

// module.exports = auth;



// Backend/middleware/auth.js - With Cookie Support for WebView Apps

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

const auth = async (req, res, next) => {
  try {
    let token = null;

    // 1. Check Authorization header first
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7);
    }

    // 2. 🍪 Fallback to cookie (WebView support)
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
      console.log('🍪 Using token from cookie');
    }

    // 3. Fallback to query param (last resort)
    if (!token && req.query?.token) {
      token = req.query.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Get user
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired, please login again'
      });
    }

    res.status(401).json({
      success: false,
      message: 'Token is not valid'
    });
  }
};

module.exports = auth;