// Backend/models/User.js - Updated for OTP-based Registration

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    // Password is now OPTIONAL for OTP-based registration
    // Users can set password later if needed
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password by default in queries
  },
  phone: {
    type: String,
    required: [true, 'Please enter your phone number'],
    unique: true // Phone number should be unique for OTP login
  },
  isPhoneVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving (only if password is provided)
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT Token
userSchema.methods.getJWTToken = function() {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET || 'your-secret-key-change-this',
    { expiresIn: '30d' }
  );
};

module.exports = mongoose.model('User', userSchema);