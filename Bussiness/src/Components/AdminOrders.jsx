import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Download, Eye, Gift } from 'lucide-react';
import api from '../utils/api';
import './AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [giftFilter, setGiftFilter] = useState('all'); // 🎁 NEW FILTER
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchQuery, statusFilter, giftFilter]);

  const checkAdminAccess = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || user.role !== 'admin') {
      alert('❌ Access Denied! Admin only.');
      navigate('/');
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/orders');
      
      if (response.data.success) {
        const sortedOrders = response.data.orders.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sortedOrders);
        setFilteredOrders(sortedOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(o => o.orderStatus === statusFilter);
    }

    // 🎁 Filter by gift
    if (giftFilter === 'with-gift') {
      filtered = filtered.filter(o => o.hasGift === true);
    } else if (giftFilter === 'without-gift') {
      filtered = filtered.filter(o => !o.hasGift);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(o => 
        o._id.toLowerCase().includes(query) ||
        o.user?.name?.toLowerCase().includes(query) ||
        o.shippingAddress?.phone?.includes(query)
      );
    }

    setFilteredOrders(filtered);
  };

  const exportToCSV = () => {
    const headers = ['Order ID', 'Customer', 'Phone', 'Items', 'Total', 'Status', 'Has Gift', 'Date'];
    const rows = filteredOrders.map(order => [
      order._id.slice(-8).toUpperCase(),
      order.user?.name || 'N/A',
      order.shippingAddress?.phone || 'N/A',
      order.orderItems?.length || 0,
      order.totalPrice,
      order.orderStatus,
      order.hasGift ? 'Yes' : 'No',
      new Date(order.createdAt).toLocaleString()
    ]);

    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
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

  // 🎁 Count orders with gifts
  const giftOrdersCount = orders.filter(o => o.hasGift).length;

  if (loading) {
    return (
      <div className="admin-orders-page">
        <div className="admin-loading">
          <div className="spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-orders-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1>All Orders</h1>
        <p>Manage all customer orders</p>
      </div>

      {/* 🎁 GIFT STATS BANNER */}
      {giftOrdersCount > 0 && (
        <div className="gift-stats-banner">
          <span className="gift-icon">🎁</span>
          <span className="gift-text">
            <strong>{giftOrdersCount}</strong> orders include FREE gift
          </span>
        </div>
      )}

      {/* Filters */}
      <div className="orders-filters">
        <div className="search-box">
          <Search size={18} color="#666" />
          <input
            type="text"
            placeholder="Search by Order ID, Customer, Phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <Filter size={18} color="#666" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Processing">Processing</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* 🎁 GIFT FILTER */}
        <div className="filter-group gift-filter">
          <span>🎁</span>
          <select
            value={giftFilter}
            onChange={(e) => setGiftFilter(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="with-gift">With Gift 🎁</option>
            <option value="without-gift">Without Gift</option>
          </select>
        </div>

        <button className="export-btn" onClick={exportToCSV}>
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Orders Count */}
      <div className="orders-count">
        <p>Showing {filteredOrders.length} of {orders.length} orders</p>
      </div>

      {/* Orders Table */}
      <div className="orders-table-container">
        {filteredOrders.length > 0 ? (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Items</th>
                <th>Total</th>
                <th>Gift</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className={order.hasGift ? 'has-gift-row' : ''}>
                  <td>
                    <span className="order-id">
                      #{order._id.slice(-8).toUpperCase()}
                    </span>
                  </td>
                  <td>{order.user?.name || 'N/A'}</td>
                  <td>{order.shippingAddress?.phone || 'N/A'}</td>
                  <td>
                    {order.orderItems?.length || 0} items
                    {order.hasGift && <span className="gift-plus"> +1🎁</span>}
                  </td>
                  <td className="order-total">₹{order.totalPrice}</td>
                  <td>
                    {/* 🎁 GIFT BADGE */}
                    {order.hasGift ? (
                      <span className="gift-badge-admin">🎁 Yes</span>
                    ) : (
                      <span className="no-gift-badge">-</span>
                    )}
                  </td>
                  <td>
                    <span className="payment-badge">
                      {order.paymentInfo?.method || 'COD'}
                    </span>
                  </td>
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
                      className="view-details-btn"
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
          <div className="no-orders-found">
            <p>No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;