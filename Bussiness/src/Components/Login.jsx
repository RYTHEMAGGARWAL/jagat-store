import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // OTP States
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(0);
  
  // Auth Method: 'password' or 'otp'
  const [authMethod, setAuthMethod] = useState('password');
  
  const otpRefs = useRef([]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const navigate = useNavigate();

  // Resend Timer Countdown
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  // OTP Input Handler
  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  // Handle OTP Paste
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;
    
    const newOtp = [...otp];
    pastedData.split('').forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    
    const lastIndex = Math.min(pastedData.length - 1, 5);
    otpRefs.current[lastIndex]?.focus();
  };

  // Handle Backspace
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Send OTP for Registration or Login
  const handleSendOtp = async () => {
    if (!formData.phone || formData.phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    // For registration, validate other fields too
    if (!isLogin) {
      if (!formData.name.trim()) {
        setError('Please enter your name');
        return;
      }
      if (!formData.email.trim()) {
        setError('Please enter your email');
        return;
      }
    }

    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/auth/send-login-otp' : '/auth/send-register-otp';
      const payload = isLogin 
        ? { phone: formData.phone }
        : { name: formData.name, email: formData.email, phone: formData.phone };

      const response = await api.post(endpoint, payload);

      if (response.data.success) {
        setOtpSent(true);
        setResendTimer(30);
        setSuccess(`OTP sent to +91 ${formData.phone}`);
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP and Complete Registration/Login
  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/auth/verify-login-otp' : '/auth/verify-register-otp';
      const payload = isLogin
        ? { phone: formData.phone, otp: otpString }
        : { name: formData.name, email: formData.email, phone: formData.phone, otp: otpString };

      const response = await api.post(endpoint, payload);

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        alert(isLogin ? 'Login successful!' : 'Account created successfully!');
        
        navigate('/');
        window.location.reload();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Password-based Login
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        alert('Login successful!');
        
        navigate('/');
        window.location.reload();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Password-based Registration
  const handlePasswordRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        alert('Account created successfully!');
        
        navigate('/');
        window.location.reload();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reset form when switching modes
  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', password: '' });
    setOtp(['', '', '', '', '', '']);
    setOtpSent(false);
    setError('');
    setSuccess('');
    setAuthMethod('password');
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (resendTimer === 0) {
      setOtp(['', '', '', '', '', '']);
      handleSendOtp();
    }
  };

  // Edit Phone Number
  const handleEditPhone = () => {
    setOtpSent(false);
    setOtp(['', '', '', '', '', '']);
  };

  // Switch auth method
  const switchAuthMethod = (method) => {
    setAuthMethod(method);
    setOtpSent(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
    setSuccess('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo/Brand */}
        <div className="brand-header">
          <div className="brand-icon">🛒</div>
          <h2>{isLogin ? 'Welcome Back!' : 'Join Jagat Store'}</h2>
          <p className="brand-subtitle">
            {isLogin 
              ? 'Login to continue shopping' 
              : 'Create account to start shopping'}
          </p>
        </div>

        {/* Auth Method Tabs */}
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${authMethod === 'password' ? 'active' : ''}`}
            onClick={() => switchAuthMethod('password')}
          >
            🔐 Password
          </button>
          <button 
            className={`auth-tab ${authMethod === 'otp' ? 'active' : ''}`}
            onClick={() => switchAuthMethod('otp')}
          >
            📱 OTP
          </button>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span> {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="success-message">
            <span className="success-icon">✓</span> {success}
          </div>
        )}

        {/* ========== LOGIN WITH PASSWORD ========== */}
        {isLogin && authMethod === 'password' && (
          <form onSubmit={handlePasswordLogin} autoComplete="off">
            <div className="form-group">
              <label>EMAIL</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>

            <div className="form-group">
              <label>PASSWORD</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div className="forgot-password-link">
              <span onClick={() => navigate('/forgot-password')}>
                Forgot Password?
              </span>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <><span className="spinner"></span> Please wait...</>
              ) : 'Login'}
            </button>
          </form>
        )}

        {/* ========== LOGIN WITH OTP ========== */}
        {isLogin && authMethod === 'otp' && (
          <div className="otp-section">
            {!otpSent ? (
              <>
                <div className="form-group">
                  <label>PHONE NUMBER</label>
                  <div className="phone-input-wrapper">
                    <span className="country-code">+91</span>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter 10-digit number"
                      value={formData.phone}
                      onChange={handleChange}
                      pattern="[0-9]{10}"
                      maxLength="10"
                      autoComplete="off"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="button" 
                  className="submit-btn"
                  onClick={handleSendOtp}
                  disabled={loading || formData.phone.length !== 10}
                >
                  {loading ? (
                    <><span className="spinner"></span> Sending OTP...</>
                  ) : 'Send OTP'}
                </button>
              </>
            ) : (
              <>
                <div className="otp-info">
                  <p>Enter OTP sent to</p>
                  <p className="phone-display">
                    +91 {formData.phone}
                    <span className="edit-phone" onClick={handleEditPhone}>Edit</span>
                  </p>
                </div>

                <div className="otp-inputs">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => otpRefs.current[index] = el}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={index === 0 ? handleOtpPaste : undefined}
                      className="otp-input"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>

                <button 
                  type="button" 
                  className="submit-btn"
                  onClick={handleVerifyOtp}
                  disabled={loading || otp.join('').length !== 6}
                >
                  {loading ? (
                    <><span className="spinner"></span> Verifying...</>
                  ) : 'Verify & Login'}
                </button>

                <div className="resend-section">
                  {resendTimer > 0 ? (
                    <p>Resend OTP in <span className="timer">{resendTimer}s</span></p>
                  ) : (
                    <p>Didn't receive OTP? <span className="resend-link" onClick={handleResendOtp}>Resend</span></p>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* ========== REGISTER WITH PASSWORD ========== */}
        {!isLogin && authMethod === 'password' && (
          <form onSubmit={handlePasswordRegister} autoComplete="off">
            <div className="form-group">
              <label>FULL NAME</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>

            <div className="form-group">
              <label>EMAIL</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>

            <div className="form-group">
              <label>PHONE NUMBER</label>
              <div className="phone-input-wrapper">
                <span className="country-code">+91</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter 10-digit number"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  maxLength="10"
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>PASSWORD</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create password (min 6 characters)"
                  value={formData.password}
                  onChange={handleChange}
                  minLength="6"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading || formData.phone.length !== 10}
            >
              {loading ? (
                <><span className="spinner"></span> Creating Account...</>
              ) : 'Create Account'}
            </button>
          </form>
        )}

        {/* ========== REGISTER WITH OTP ========== */}
        {!isLogin && authMethod === 'otp' && (
          <div className="register-section">
            {!otpSent ? (
              <>
                <div className="form-group">
                  <label>FULL NAME</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>PHONE NUMBER</label>
                  <div className="phone-input-wrapper">
                    <span className="country-code">+91</span>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter 10-digit number"
                      value={formData.phone}
                      onChange={handleChange}
                      pattern="[0-9]{10}"
                      maxLength="10"
                      autoComplete="off"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="button" 
                  className="submit-btn"
                  onClick={handleSendOtp}
                  disabled={loading || !formData.name || !formData.email || formData.phone.length !== 10}
                >
                  {loading ? (
                    <><span className="spinner"></span> Sending OTP...</>
                  ) : 'Send OTP'}
                </button>
              </>
            ) : (
              <>
                <div className="otp-info">
                  <p>Verify your phone number</p>
                  <p className="phone-display">
                    +91 {formData.phone}
                    <span className="edit-phone" onClick={handleEditPhone}>Edit</span>
                  </p>
                </div>

                <div className="otp-inputs">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => otpRefs.current[index] = el}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={index === 0 ? handleOtpPaste : undefined}
                      className="otp-input"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>

                <button 
                  type="button" 
                  className="submit-btn"
                  onClick={handleVerifyOtp}
                  disabled={loading || otp.join('').length !== 6}
                >
                  {loading ? (
                    <><span className="spinner"></span> Creating Account...</>
                  ) : 'Verify & Create Account'}
                </button>

                <div className="resend-section">
                  {resendTimer > 0 ? (
                    <p>Resend OTP in <span className="timer">{resendTimer}s</span></p>
                  ) : (
                    <p>Didn't receive OTP? <span className="resend-link" onClick={handleResendOtp}>Resend</span></p>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Toggle Login/Register */}
        <div className="toggle-form">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => {
              setIsLogin(!isLogin);
              resetForm();
            }}>
              {isLogin ? 'Register here' : 'Login here'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;