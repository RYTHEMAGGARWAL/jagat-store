// Frontend/src/Components/AdminPromoSMS.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Send, Users, Clock, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import api from '../utils/api';
import './AdminPromoSMS.css';

const AdminPromoSMS = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [targetGroup, setTargetGroup] = useState('all');
  const [stats, setStats] = useState({ allCustomers: 0, last30Days: 0, last7Days: 0 });
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);

  // Sample templates
  const templates = [
    {
      name: '🛒 General Store',
      text: 'JAGAT STORE - Apki apni grocery shop! Pooja samagri, Grocery, Dairy - sab milta hai. Order now: jagatstore.in'
    },
    {
      name: '🚚 Free Delivery',
      text: 'JAGAT STORE: Free delivery on all orders! Fresh grocery, dairy, pooja items - ghar baithe mangwao. jagatstore.in'
    },
    {
      name: '🎉 Festival Special',
      text: 'JAGAT STORE: Festival special! Pooja samagri, sweets, dry fruits - sab available. Order now: jagatstore.in'
    },
    {
      name: '🆕 New Arrivals',
      text: 'JAGAT STORE: Naye products aa gaye! Fresh vegetables, fruits aur daily needs. Check now: jagatstore.in'
    },
    {
      name: '💰 Budget Friendly',
      text: 'JAGAT STORE: Sasta aur accha! Daily grocery at best prices. Free delivery. Order: jagatstore.in'
    }
  ];

  useEffect(() => {
    checkAdminAccess();
    fetchStats();
  }, []);

  const checkAdminAccess = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || user.role !== 'admin') {
      alert('❌ Access Denied! Admin only.');
      navigate('/');
    }
  };

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await api.get('/promo/stats');
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Stats fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTargetCount = () => {
    switch (targetGroup) {
      case 'all': return stats.allCustomers;
      case 'last30days': return stats.last30Days;
      case 'last7days': return stats.last7Days;
      default: return 0;
    }
  };

  const getEstimatedCost = () => {
    const count = getTargetCount();
    const min = (count * 0.10).toFixed(2);
    const max = (count * 0.15).toFixed(2);
    return `₹${min} - ₹${max}`;
  };

  const handleSend = async () => {
    if (!message.trim()) {
      alert('Please enter a message');
      return;
    }
    
    if (message.length > 160) {
      alert('Message too long! Max 160 characters allowed.');
      return;
    }

    const count = getTargetCount();
    if (count === 0) {
      alert('No customers to send to!');
      return;
    }

    const confirm = window.confirm(
      `📱 Send SMS to ${count} customers?\n\nMessage:\n"${message}"\n\nEstimated Cost: ${getEstimatedCost()}`
    );

    if (!confirm) return;

    try {
      setSending(true);
      setResult(null);
      
      const response = await api.post('/promo/send', {
        message: message.trim(),
        targetGroup
      });

      if (response.data.success) {
        setResult({
          type: 'success',
          message: response.data.message,
          details: response.data.details
        });
        setMessage(''); // Clear message on success
      }
    } catch (error) {
      setResult({
        type: 'error',
        message: error.response?.data?.message || 'Failed to send SMS'
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="admin-promo-page">
      {/* Header */}
      <div className="promo-page-header">
        <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <div className="header-title">
          <MessageSquare size={32} color="#9c27b0" />
          <div>
            <h1>📢 Promotional SMS</h1>
            <p>Send marketing messages to your customers</p>
          </div>
        </div>
      </div>

      <div className="promo-content">
        {/* Left Side - Form */}
        <div className="promo-form-section">
          
          {/* Target Audience */}
          <div className="form-card">
            <h3>🎯 Select Target Audience</h3>
            <div className="audience-options">
              <div 
                className={`audience-card ${targetGroup === 'all' ? 'active' : ''}`}
                onClick={() => setTargetGroup('all')}
              >
                <Users size={28} />
                <div className="audience-info">
                  <span className="audience-count">{loading ? '...' : stats.allCustomers}</span>
                  <span className="audience-label">All Customers</span>
                </div>
                <input 
                  type="radio" 
                  checked={targetGroup === 'all'} 
                  onChange={() => setTargetGroup('all')}
                />
              </div>

              <div 
                className={`audience-card ${targetGroup === 'last30days' ? 'active' : ''}`}
                onClick={() => setTargetGroup('last30days')}
              >
                <Clock size={28} />
                <div className="audience-info">
                  <span className="audience-count">{loading ? '...' : stats.last30Days}</span>
                  <span className="audience-label">Ordered in Last 30 Days</span>
                </div>
                <input 
                  type="radio" 
                  checked={targetGroup === 'last30days'} 
                  onChange={() => setTargetGroup('last30days')}
                />
              </div>

              <div 
                className={`audience-card ${targetGroup === 'last7days' ? 'active' : ''}`}
                onClick={() => setTargetGroup('last7days')}
              >
                <Clock size={28} />
                <div className="audience-info">
                  <span className="audience-count">{loading ? '...' : stats.last7Days}</span>
                  <span className="audience-label">Ordered in Last 7 Days</span>
                </div>
                <input 
                  type="radio" 
                  checked={targetGroup === 'last7days'} 
                  onChange={() => setTargetGroup('last7days')}
                />
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="form-card">
            <h3>✍️ Write Your Message</h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your promotional message here..."
              maxLength={160}
              rows={5}
            />
            <div className="textarea-footer">
              <span className={`char-count ${message.length > 140 ? 'warning' : ''}`}>
                {message.length}/160 characters
              </span>
            </div>
          </div>

          {/* Cost & Send */}
          <div className="form-card cost-card">
            <div className="cost-summary">
              <div className="cost-item">
                <span>📱 Target Customers</span>
                <strong>{getTargetCount()}</strong>
              </div>
              <div className="cost-item">
                <span>💰 Estimated Cost</span>
                <strong>{getEstimatedCost()}</strong>
              </div>
            </div>

            {/* Result Message */}
            {result && (
              <div className={`result-box ${result.type}`}>
                {result.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                <div>
                  <p>{result.message}</p>
                  {result.details && (
                    <small>
                      Sent: {result.details.success} | Failed: {result.details.failed} | Cost: {result.details.estimatedCost}
                    </small>
                  )}
                </div>
              </div>
            )}

            <button 
              className="send-btn"
              onClick={handleSend}
              disabled={sending || !message.trim() || getTargetCount() === 0}
            >
              {sending ? (
                <>
                  <div className="spinner-small"></div>
                  Sending SMS...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Promotional SMS
                </>
              )}
            </button>
          </div>

          {/* Warning */}
          <div className="warning-box">
            <AlertCircle size={18} />
            <div>
              <strong>Important Notes:</strong>
              <ul>
                <li>Promotional SMS only sent between 9 AM - 9 PM</li>
                <li>DND registered numbers won't receive SMS</li>
                <li>Cost: ₹0.10 - ₹0.15 per SMS</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side - Templates */}
        <div className="promo-templates-section">
          <div className="form-card">
            <h3>📝 Quick Templates</h3>
            <p className="template-hint">Click any template to use it</p>
            
            <div className="templates-list">
              {templates.map((template, index) => (
                <div 
                  key={index}
                  className={`template-item ${message === template.text ? 'selected' : ''}`}
                  onClick={() => setMessage(template.text)}
                >
                  <div className="template-name">{template.name}</div>
                  <div className="template-text">{template.text}</div>
                  <div className="template-chars">{template.text.length} chars</div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          {message && (
            <div className="form-card preview-card">
              <h3>👁️ Message Preview</h3>
              <div className="sms-preview">
                <div className="sms-bubble">
                  {message}
                </div>
                <div className="sms-info">
                  <span>SMS • {message.length} characters</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPromoSMS;