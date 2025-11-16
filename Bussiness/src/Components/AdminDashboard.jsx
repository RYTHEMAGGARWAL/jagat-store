// Frontend/src/Components/AdminDashboard.jsx - FIXED

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  DollarSign,
  Clock,
  Users,
  Eye
} from 'lucide-react';
import api from '../utils/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    pendingOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
    fetchDashboardData();
  }, []);

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
      
      console.log('📊 Fetching dashboard data...');
      
      // Fetch all orders from backend
      const response = await api.get('/orders');
      
      console.log('📥 Orders Response:', response.data);
      
      if (response.data.success) {
        const orders = response.data.orders || [];
        
        console.log('✅ Orders fetched:', orders.length);
        
        // Sort orders by date - NEWEST FIRST
        const sortedOrders = orders.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        // Calculate stats
        const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
        const pendingOrders = orders.filter(o => 
          o.orderStatus === 'Processing' || o.orderStatus === 'Confirmed'
        ).length;
        
        // Get unique users
        const uniqueUsers = new Set(orders.map(o => o.user?._id || o.user));
        
        setStats({
          totalOrders: orders.length,
          totalRevenue: totalRevenue,
          totalUsers: uniqueUsers.size,
          pendingOrders: pendingOrders
        });
        
        // Get recent orders (last 10, newest first)
        setRecentOrders(sortedOrders.slice(0, 10));
        
        console.log('✅ Dashboard data loaded successfully');
      } else {
        console.error('❌ Response not successful:', response.data);
        setError('Failed to fetch orders');
      }
      
    } catch (error) {
      console.error('❌ Error fetching dashboard data:', error);
      setError(error.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
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

  const handleViewOrder = (orderId) => {
    console.log('Viewing order:', orderId);
    navigate(`/admin/orders/${orderId}`);
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

        <div className="stat-card">
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
          <div className="stat-icon" style={{ background: '#fce4ec' }}>
            <Users size={28} color="#e91e63" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Customers</p>
            <h2 className="stat-value">{stats.totalUsers}</h2>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="recent-orders-section">
        <div className="section-header">
          <h2>Recent Orders</h2>
          <button 
            className="view-all-btn"
            onClick={() => navigate('/admin/orders')}
          >
            View All Orders
          </button>
        </div>

        <div className="orders-table">
          {recentOrders.length > 0 ? (
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
                {recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <span className="order-id">
                        #{order._id.slice(-8).toUpperCase()}
                      </span>
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
                        onClick={() => handleViewOrder(order._id)}
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
              <p>No orders yet</p>
              <p>Orders will appear here once customers place them</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;