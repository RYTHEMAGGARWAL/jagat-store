// Frontend/src/Components/AdminPromoSMS.jsx - ALL 8 PROMO TEMPLATES

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Send, Users, Clock, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import api from '../utils/api';
import './AdminPromoSMS.css';

const AdminPromoSMS = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [targetGroup, setTargetGroup] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [stats, setStats] = useState({ allCustomers: 0, last30Days: 0, last7Days: 0 });
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);
  
  // 🧪 Test SMS states
  const [testPhone, setTestPhone] = useState('');
  const [testSending, setTestSending] = useState(false);
  const [testResult, setTestResult] = useState(null);

  // ✅ ALL 8 DLT APPROVED PROMO TEMPLATES
  const templates = [
    {
      id: 'mystery_gift',
      name: '🎁 Mystery Gift Offer',
      text: 'JAGAT STORE: Order above Rs.{amount} and get a FREE Mystery Gift! Shop now at jagatstore.in Hurry, limited stock! - JAGAT STORE',
      variables: { amount: '999' },
      getMessage: (vars) => `JAGAT STORE: Order above Rs.${vars.amount || '999'} and get a FREE Mystery Gift! Shop now at jagatstore.in Hurry, limited stock! - JAGAT STORE`
    },
    {
      id: 'discount',
      name: '💰 Discount Offer',
      text: 'JAGAT STORE: Get {percent} percent OFF on all products! Shop now at jagatstore.in Use code: {code} - JAGAT STORE',
      variables: { percent: '20', code: 'SAVE20' },
      getMessage: (vars) => `JAGAT STORE: Get ${vars.percent || '20'} percent OFF on all products! Shop now at jagatstore.in Use code: ${vars.code || 'SAVE20'} - JAGAT STORE`
    },
    {
      id: 'festival',
      name: '🎉 Festival Sale',
      text: 'JAGAT STORE: {festival} Sale is LIVE! Upto {percent} percent OFF on all items. Shop at jagatstore.in - JAGAT STORE',
      variables: { festival: 'Winter', percent: '50' },
      getMessage: (vars) => `JAGAT STORE: ${vars.festival || 'Festival'} Sale is LIVE! Upto ${vars.percent || '50'} percent OFF on all items. Shop at jagatstore.in - JAGAT STORE`
    },
    {
      id: 'free_delivery',
      name: '🚚 Free Delivery (Eng)',
      text: 'JAGAT STORE: FREE Delivery on orders above Rs.{amount}! Shop groceries at jagatstore.in Order now! - JAGAT STORE',
      variables: { amount: '499' },
      getMessage: (vars) => `JAGAT STORE: FREE Delivery on orders above Rs.${vars.amount || '499'}! Shop groceries at jagatstore.in Order now! - JAGAT STORE`
    },
    // 🆕 NEW TEMPLATES
    {
      id: 'festival_pooja',
      name: '🪔 Festival Pooja Special',
      text: 'JAGAT STORE: {festival} special! Pooja samagri, sweets, dry fruits - sab available. Order now: jagatstore.in - JAGAT STORE',
      variables: { festival: 'Diwali' },
      getMessage: (vars) => `JAGAT STORE: ${vars.festival || 'Festival'} special! Pooja samagri, sweets, dry fruits - sab available. Order now: jagatstore.in - JAGAT STORE`
    },
    {
      id: 'welcome_promo',
      name: '👋 Welcome/Intro Message',
      text: 'JAGAT STORE - Apki apni grocery shop! Pooja samagri, Grocery, Dairy - sab milta hai. Order now: jagatstore.in - JAGAT STORE',
      variables: {},
      getMessage: () => `JAGAT STORE - Apki apni grocery shop! Pooja samagri, Grocery, Dairy - sab milta hai. Order now: jagatstore.in - JAGAT STORE`
    },
    {
      id: 'free_delivery_hindi',
      name: '🚚 Free Delivery (Hindi)',
      text: 'JAGAT STORE: Free delivery on all orders above Rs.{amount}! Fresh grocery, dairy, pooja items - ghar baithe mangwao. jagatstore.in - JAGAT STORE',
      variables: { amount: '399' },
      getMessage: (vars) => `JAGAT STORE: Free delivery on all orders above Rs.${vars.amount || '399'}! Fresh grocery, dairy, pooja items - ghar baithe mangwao. jagatstore.in - JAGAT STORE`
    },
    {
      id: 'budget_friendly',
      name: '💵 Budget Friendly',
      text: 'JAGAT STORE: Sasta aur accha! Daily grocery at best prices. Free delivery above Rs.{amount}. Order: jagatstore.in - JAGAT STORE',
      variables: { amount: '299' },
      getMessage: (vars) => `JAGAT STORE: Sasta aur accha! Daily grocery at best prices. Free delivery above Rs.${vars.amount || '299'}. Order: jagatstore.in - JAGAT STORE`
    }
  ];

  const [templateVars, setTemplateVars] = useState({});

  useEffect(() => {
    checkAdminAccess();
    fetchStats();
  }, []);

  useEffect(() => {
    if (selectedTemplate) {
      const template = templates.find(t => t.id === selectedTemplate);
      if (template) {
        const vars = { ...template.variables, ...templateVars };
        setMessage(template.getMessage(vars));
      }
    }
  }, [selectedTemplate, templateVars]);

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

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setTemplateVars(template.variables);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) {
      alert('Please select a template');
      return;
    }
    
    if (!selectedTemplate) {
      alert('Please select a DLT approved template');
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
        targetGroup,
        templateType: selectedTemplate,
        variable1: templateVars[Object.keys(templateVars)[0]] || '',
        variable2: templateVars[Object.keys(templateVars)[1]] || ''
      });

      if (response.data.success) {
        setResult({
          type: 'success',
          message: response.data.message,
          details: response.data.details
        });
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

  // 🧪 TEST SMS FUNCTION
  const handleTestSMS = async () => {
    if (!message.trim()) {
      alert('Pehle template select karo!');
      return;
    }
    
    if (!testPhone.trim()) {
      alert('Phone number daalo!');
      return;
    }
    
    const cleanPhone = testPhone.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) {
      alert('Valid 10 digit phone number daalo!');
      return;
    }

    try {
      setTestSending(true);
      setTestResult(null);
      
      const response = await api.post('/promo/test', {
        phone: cleanPhone,
        templateType: selectedTemplate,
        variable1: templateVars[Object.keys(templateVars)[0]] || '',
        variable2: templateVars[Object.keys(templateVars)[1]] || ''
      });

      if (response.data.success) {
        setTestResult({
          type: 'success',
          message: response.data.message
        });
      }
    } catch (error) {
      setTestResult({
        type: 'error',
        message: error.response?.data?.message || 'Test SMS failed'
      });
    } finally {
      setTestSending(false);
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
            <p>Send DLT approved marketing messages (8 Templates)</p>
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
                  <span className="audience-label">Last 30 Days</span>
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
                  <span className="audience-label">Last 7 Days</span>
                </div>
                <input 
                  type="radio" 
                  checked={targetGroup === 'last7days'} 
                  onChange={() => setTargetGroup('last7days')}
                />
              </div>
            </div>
          </div>

          {/* Template Variables */}
          {selectedTemplate && Object.keys(templates.find(t => t.id === selectedTemplate)?.variables || {}).length > 0 && (
            <div className="form-card">
              <h3>✏️ Customize Message</h3>
              {Object.entries(templates.find(t => t.id === selectedTemplate)?.variables || {}).map(([key, defaultVal]) => (
                <div key={key} className="variable-input">
                  <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                  <input
                    type="text"
                    value={templateVars[key] || defaultVal}
                    onChange={(e) => setTemplateVars({...templateVars, [key]: e.target.value})}
                    placeholder={defaultVal}
                  />
                </div>
              ))}
            </div>
          )}

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
              disabled={sending || !selectedTemplate || getTargetCount() === 0}
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
              <strong>⚠️ DLT Compliance:</strong>
              <ul>
                <li>Only DLT approved templates can be sent</li>
                <li>Promotional SMS only between 9 AM - 9 PM</li>
                <li>DND registered numbers won't receive SMS</li>
                <li>Cost: ₹0.10 - ₹0.15 per SMS</li>
              </ul>
            </div>
          </div>

          {/* 🧪 TEST SMS SECTION */}
          <div className="form-card test-sms-card">
            <h3>🧪 Test SMS First</h3>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
              Pehle apne number pe test karo, phir sabko bhejo
            </p>
            
            <div className="test-input-row">
              <input
                type="tel"
                placeholder="Enter phone (e.g. 9876543210)"
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
                maxLength={10}
                className="test-phone-input"
              />
              <button 
                className="test-send-btn"
                onClick={handleTestSMS}
                disabled={testSending || !selectedTemplate || !testPhone.trim()}
              >
                {testSending ? '⏳ Sending...' : '🧪 Send Test'}
              </button>
            </div>
            
            {testResult && (
              <div className={`test-result ${testResult.type}`}>
                {testResult.type === 'success' ? '✅' : '❌'} {testResult.message}
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Templates */}
        <div className="promo-templates-section">
          <div className="form-card">
            <h3>📝 DLT Approved Templates (8)</h3>
            <p className="template-hint">⚠️ Only these templates are approved by TRAI</p>
            
            <div className="templates-list">
              {templates.map((template) => (
                <div 
                  key={template.id}
                  className={`template-item ${selectedTemplate === template.id ? 'selected' : ''}`}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <div className="template-name">{template.name}</div>
                  <div className="template-text">{template.text}</div>
                  <div className="template-chars">
                    {selectedTemplate === template.id ? '✅ Selected' : 'Click to select'}
                  </div>
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