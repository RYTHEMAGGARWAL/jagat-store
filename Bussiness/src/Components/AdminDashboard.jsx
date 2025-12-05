// Frontend/src/Components/AdminDashboard.jsx - WITH STORE ON/OFF TOGGLE

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  DollarSign,
  Clock,
  Users,
  Eye,
  Calendar,
  TrendingUp,
  Package,
  CheckCircle,
  XCircle,
  Filter
} from 'lucide-react';
import api from '../utils/api';
import StoreToggle from './StoreToggle';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateFilter, setDateFilter] = useState('today');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (allOrders.length > 0) {
      applyDateFilter();
    }
  }, [dateFilter, customStartDate, customEndDate, allOrders]);

  const checkAdminAccess = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || user.role !== 'admin') {
      alert('❌ Access Denied! Admin only.');
      navigate('/');
      return false;
    }
    return true;
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/orders');
      
      if (response.data.success) {
        const orders = response.data.orders || [];
        const sortedOrders = orders.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setAllOrders(sortedOrders);
      } else {
        setError('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError(error.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const applyDateFilter = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - 7);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    let filtered = [];

    switch (dateFilter) {
      case 'today':
        filtered = allOrders.filter(order => 
          new Date(order.createdAt) >= today
        );
        break;
      case 'yesterday':
        filtered = allOrders.filter(order => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= yesterday && orderDate < today;
        });
        break;
      case 'week':
        filtered = allOrders.filter(order => 
          new Date(order.createdAt) >= weekStart
        );
        break;
      case 'month':
        filtered = allOrders.filter(order => 
          new Date(order.createdAt) >= monthStart
        );
        break;
      case 'all':
        filtered = [...allOrders];
        break;
      case 'custom':
        if (customStartDate && customEndDate) {
          const start = new Date(customStartDate);
          const end = new Date(customEndDate);
          end.setHours(23, 59, 59, 999);
          filtered = allOrders.filter(order => {
            const orderDate = new Date(order.createdAt);
            return orderDate >= start && orderDate <= end;
          });
        } else {
          filtered = [...allOrders];
        }
        break;
      default:
        filtered = [...allOrders];
    }

    setFilteredOrders(filtered);
    calculateStats(filtered);
  };

  const calculateStats = (orders) => {
    const totalRevenue = orders.reduce((sum, order) => {
      if (order.orderStatus !== 'Cancelled') {
        return sum + (order.totalPrice || 0);
      }
      return sum;
    }, 0);

    const pendingOrders = orders.filter(o => 
      o.orderStatus === 'Processing' || o.orderStatus === 'Confirmed'
    ).length;

    const deliveredOrders = orders.filter(o => 
      o.orderStatus === 'Delivered'
    ).length;

    const cancelledOrders = orders.filter(o => 
      o.orderStatus === 'Cancelled'
    ).length;

    const uniqueUsers = new Set(orders.map(o => o.user?._id || o.user));

    setStats({
      totalOrders: orders.length,
      totalRevenue: totalRevenue,
      totalUsers: uniqueUsers.size,
      pendingOrders: pendingOrders,
      deliveredOrders: deliveredOrders,
      cancelledOrders: cancelledOrders
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'Processing': '#ff9800',
      'Confirmed': '#2196f3',
      'Shipped': '#9c27b0',
      'Out for Delivery': '#00bcd4',
      'Delivered': '#4caf50',
      'Cancelled': '#f44336'
    };
    return colors[status] || '#666';
  };

  const getDateFilterLabel = () => {
    switch (dateFilter) {
      case 'today': return "Today's";
      case 'yesterday': return "Yesterday's";
      case 'week': return "This Week's";
      case 'month': return "This Month's";
      case 'all': return "All Time";
      case 'custom': return "Custom Range";
      default: return "";
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-loading">
        <div className="error-message">
          <h2>❌ Error Loading Dashboard</h2>
          <p>{error}</p>
          <button onClick={fetchDashboardData} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>🎯 Admin Dashboard</h1>
        <p>Manage your store from here</p>
      </div>

      {/* 🏪 STORE ON/OFF TOGGLE - NEW! */}
      <StoreToggle />

      {/* 📅 DATE FILTER SECTION */}
      <div className="date-filter-section">
        <div className="filter-header">
          <Calendar size={20} />
          <span>Filter by Date</span>
        </div>
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${dateFilter === 'today' ? 'active' : ''}`}
            onClick={() => setDateFilter('today')}
          >
            Today
          </button>
          <button 
            className={`filter-btn ${dateFilter === 'yesterday' ? 'active' : ''}`}
            onClick={() => setDateFilter('yesterday')}
          >
            Yesterday
          </button>
          <button 
            className={`filter-btn ${dateFilter === 'week' ? 'active' : ''}`}
            onClick={() => setDateFilter('week')}
          >
            This Week
          </button>
          <button 
            className={`filter-btn ${dateFilter === 'month' ? 'active' : ''}`}
            onClick={() => setDateFilter('month')}
          >
            This Month
          </button>
          <button 
            className={`filter-btn ${dateFilter === 'all' ? 'active' : ''}`}
            onClick={() => setDateFilter('all')}
          >
            All Time
          </button>
          <button 
            className={`filter-btn ${dateFilter === 'custom' ? 'active' : ''}`}
            onClick={() => setDateFilter('custom')}
          >
            Custom
          </button>
        </div>

        {dateFilter === 'custom' && (
          <div className="custom-date-range">
            <div className="date-input-group">
              <label>From:</label>
              <input 
                type="date" 
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
              />
            </div>
            <div className="date-input-group">
              <label>To:</label>
              <input 
                type="date" 
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* 📊 STATS HEADER */}
      <div className="stats-header">
        <h2>{getDateFilterLabel()} Statistics</h2>
        <span className="orders-count-badge">{stats.totalOrders} Orders</span>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e3f2fd' }}>
            <ShoppingBag size={28} color="#2196f3" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Orders</p>
            <h2 className="stat-value">{stats.totalOrders}</h2>
          </div>
        </div>

        <div className="stat-card highlight">
          <div className="stat-icon" style={{ background: '#e8f5e9' }}>
            <DollarSign size={28} color="#4caf50" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Revenue</p>
            <h2 className="stat-value">₹{stats.totalRevenue.toLocaleString()}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fff3e0' }}>
            <Clock size={28} color="#ff9800" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Pending Orders</p>
            <h2 className="stat-value">{stats.pendingOrders}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e8f5e9' }}>
            <CheckCircle size={28} color="#4caf50" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Delivered</p>
            <h2 className="stat-value">{stats.deliveredOrders}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ffebee' }}>
            <XCircle size={28} color="#f44336" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Cancelled</p>
            <h2 className="stat-value">{stats.cancelledOrders}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fce4ec' }}>
            <Users size={28} color="#e91e63" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Customers</p>
            <h2 className="stat-value">{stats.totalUsers}</h2>
          </div>
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div className="quick-summary">
        <div className="summary-card">
          <TrendingUp size={20} color="#4caf50" />
          <span>Avg Order Value: <strong>₹{stats.totalOrders > 0 ? Math.round(stats.totalRevenue / stats.totalOrders) : 0}</strong></span>
        </div>
        <div className="summary-card">
          <Package size={20} color="#2196f3" />
          <span>Success Rate: <strong>{stats.totalOrders > 0 ? Math.round((stats.deliveredOrders / stats.totalOrders) * 100) : 0}%</strong></span>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="recent-orders-section">
        <div className="section-header">
          <h2>{getDateFilterLabel()} Orders ({filteredOrders.length})</h2>
          <button 
            className="view-all-btn"
            onClick={() => navigate('/admin/orders')}
          >
            View All Orders
          </button>
        </div>

        <div className="orders-table">
          {filteredOrders.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.slice(0, 20).map((order) => (
                  <tr key={order._id}>
                    <td>
                      <span className="order-id">
                        #{order._id.slice(-8).toUpperCase()}
                      </span>
                      {order.hasGift && <span className="gift-indicator">🎁</span>}
                    </td>
                    <td>{order.user?.name || 'N/A'}</td>
                    <td>{order.shippingAddress?.phone || 'N/A'}</td>
                    <td>{order.orderItems?.length || 0} items</td>
                    <td className="order-total">₹{order.totalPrice}</td>
                    <td>
                      <span 
                        className="status-badge"
                        style={{ background: getStatusColor(order.orderStatus) }}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="order-date">{formatDate(order.createdAt)}</td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => navigate(`/admin/orders/${order._id}`)}
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-orders">
              <p>No orders found for {getDateFilterLabel().toLowerCase()}</p>
              <p>Try selecting a different date range</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;