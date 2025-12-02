// Frontend/src/Components/AdminProducts.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Plus, Eye, Edit, Trash2, Package } from 'lucide-react';
import api from '../utils/api';
import './AdminProducts.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  const categories = [
    'Atta Rice Dal',
    'Masala Oil',
    'Dairy Bread & Eggs',
    'Sauces & Spreads',
    'Sweet Tooth',
    'Snacks Munchies',
    
    'Bakery Biscuits',
    'Cold Drinks & Juices',
    'Jagat Store',
    'Breakfast & Instant Foods',
    'Pharmacy',
    'Cleaning Essentials',
    'Personal Care',
    'Snacks & Munchies',
    'Home and Offices',
    'Organic & Healthy Living',
    'Baby Care',
    'Pet Care',
   
  ];

  useEffect(() => {
    checkAdminAccess();
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, categoryFilter, stockFilter]);

  const checkAdminAccess = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || user.role !== 'admin') {
      alert('❌ Access Denied! Admin only.');
      navigate('/');
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      
      if (response.data.success) {
        setProducts(response.data.products || []);
        setFilteredProducts(response.data.products || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    // Filter by stock
    if (stockFilter === 'in-stock') {
      filtered = filtered.filter(p => p.inStock === true);
    } else if (stockFilter === 'out-of-stock') {
      filtered = filtered.filter(p => p.inStock === false);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name?.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  };

  // 🔄 Toggle Stock Status
  const toggleStock = async (product) => {
    try {
      const newStatus = !product.inStock;
      
      await api.put(`/products/${product._id}`, {
        inStock: newStatus
      });
      
      // Update local state
      setProducts(prev => prev.map(p => 
        p._id === product._id ? { ...p, inStock: newStatus } : p
      ));
      
      alert(`✅ ${product.name} - ${newStatus ? 'In Stock' : 'Out of Stock'}`);
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('❌ Stock update failed!');
    }
  };

  // 🗑️ Delete Product
  const deleteProduct = async (product) => {
    if (!window.confirm(`🗑️ "${product.name}" delete karna hai?\n\nYeh wapas nahi aayega!`)) {
      return;
    }
    
    try {
      await api.delete(`/products/${product._id}`);
      
      // Remove from local state
      setProducts(prev => prev.filter(p => p._id !== product._id));
      
      alert(`✅ ${product.name} deleted!`);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('❌ Delete failed!');
    }
  };

  // ✏️ Open Edit Modal
  const openEditModal = (product) => {
    setEditingProduct({ ...product });
    setShowEditModal(true);
  };

  // 💾 Save Edited Product
  const saveProduct = async () => {
    if (!editingProduct.name || !editingProduct.price) {
      alert('❌ Name aur Price required hai!');
      return;
    }

    try {
      setUpdating(true);
      
      const response = await api.put(`/products/${editingProduct._id}`, {
        name: editingProduct.name,
        brand: editingProduct.brand,
        category: editingProduct.category,
        price: parseFloat(editingProduct.price),
        oldPrice: parseFloat(editingProduct.oldPrice) || parseFloat(editingProduct.price),
        weight: editingProduct.weight,
        stock: parseInt(editingProduct.stock) || 100,
        inStock: editingProduct.inStock,
        discount: editingProduct.discount,
        description: editingProduct.description,
        image: editingProduct.image
      });
      
      if (response.data.success) {
        // Update local state
        setProducts(prev => prev.map(p => 
          p._id === editingProduct._id ? response.data.product : p
        ));
        
        setShowEditModal(false);
        setEditingProduct(null);
        alert('✅ Product updated!');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('❌ Update failed!');
    } finally {
      setUpdating(false);
    }
  };

  // Stats
  const totalProducts = products.length;
  const inStockCount = products.filter(p => p.inStock).length;
  const outOfStockCount = products.filter(p => !p.inStock).length;

  if (loading) {
    return (
      <div className="admin-products-page">
        <div className="admin-loading">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-products-page">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1>📦 Products Management</h1>
        <p>Manage all your store products</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <Package size={24} color="#2196f3" />
          <div>
            <span className="stat-number">{totalProducts}</span>
            <span className="stat-label">Total Products</span>
          </div>
        </div>
        <div className="stat-card in-stock">
          <span className="stat-number">{inStockCount}</span>
          <span className="stat-label">✅ In Stock</span>
        </div>
        <div className="stat-card out-stock">
          <span className="stat-number">{outOfStockCount}</span>
          <span className="stat-label">❌ Out of Stock</span>
        </div>
      </div>

      {/* Filters */}
      <div className="products-filters">
        <div className="search-box">
          <Search size={18} color="#666" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <Filter size={18} color="#666" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="filter-group stock-filter">
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <option value="all">All Stock</option>
            <option value="in-stock">✅ In Stock</option>
            <option value="out-of-stock">❌ Out of Stock</option>
          </select>
        </div>

        <button className="add-product-btn" onClick={() => navigate('/admin/add-product')}>
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Products Count */}
      <div className="products-count">
        <p>Showing {filteredProducts.length} of {products.length} products</p>
      </div>

      {/* Products Table */}
      <div className="products-table-container">
        {filteredProducts.length > 0 ? (
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id} className={!product.inStock ? 'out-of-stock-row' : ''}>
                  <td>
                    <img 
                      src={product.image || 'https://via.placeholder.com/60x60?text=No+Image'} 
                      alt={product.name}
                      className="product-thumb"
                      onError={(e) => e.target.src = 'https://via.placeholder.com/60x60?text=No+Image'}
                    />
                  </td>
                  <td>
                    <div className="product-info">
                      <span className="product-name">{product.name}</span>
                      <span className="product-brand">{product.brand || '-'}</span>
                      <span className="product-weight">{product.weight || '-'}</span>
                    </div>
                  </td>
                  <td>
                    <span className="category-badge">{product.category}</span>
                  </td>
                  <td>
                    <div className="price-info">
                      <span className="current-price">₹{product.price}</span>
                      {product.oldPrice > product.price && (
                        <span className="old-price">₹{product.oldPrice}</span>
                      )}
                      {product.discount && (
                        <span className="discount-badge">{product.discount}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="stock-count">{product.stock || 0}</span>
                  </td>
                  <td>
                    <button 
                      className={`stock-toggle-btn ${product.inStock ? 'in-stock' : 'out-stock'}`}
                      onClick={() => toggleStock(product)}
                    >
                      {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-btn"
                        onClick={() => openEditModal(product)}
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => deleteProduct(product)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-products-found">
            <Package size={60} color="#ccc" />
            <p>No products found</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && editingProduct && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>✏️ Edit Product</h2>
              <button className="close-modal" onClick={() => setShowEditModal(false)}>✕</button>
            </div>
            
            <div className="edit-form">
              {/* Image Preview */}
              {editingProduct.image && (
                <div className="image-preview-container">
                  <img src={editingProduct.image} alt="Product" className="edit-image-preview" />
                </div>
              )}

              <div className="form-grid">
                <div className="form-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    value={editingProduct.name || ''}
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                    placeholder="Product name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Brand</label>
                  <input
                    type="text"
                    value={editingProduct.brand || ''}
                    onChange={(e) => setEditingProduct({...editingProduct, brand: e.target.value})}
                    placeholder="Brand name"
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={editingProduct.category || ''}
                    onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Weight/Size</label>
                  <input
                    type="text"
                    value={editingProduct.weight || ''}
                    onChange={(e) => setEditingProduct({...editingProduct, weight: e.target.value})}
                    placeholder="e.g., 500g, 1L"
                  />
                </div>

                <div className="form-group">
                  <label>Selling Price (₹) *</label>
                  <input
                    type="number"
                    value={editingProduct.price || ''}
                    onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                    placeholder="Selling price"
                    min="0"
                  />
                </div>
                
                <div className="form-group">
                  <label>MRP (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.oldPrice || ''}
                    onChange={(e) => setEditingProduct({...editingProduct, oldPrice: e.target.value})}
                    placeholder="Original price"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Stock Quantity</label>
                  <input
                    type="number"
                    value={editingProduct.stock || ''}
                    onChange={(e) => setEditingProduct({...editingProduct, stock: e.target.value})}
                    placeholder="Stock count"
                    min="0"
                  />
                </div>
                
                <div className="form-group">
                  <label>Discount</label>
                  <input
                    type="text"
                    value={editingProduct.discount || ''}
                    onChange={(e) => setEditingProduct({...editingProduct, discount: e.target.value})}
                    placeholder="e.g., 15% OFF"
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Image URL</label>
                <input
                  type="text"
                  value={editingProduct.image || ''}
                  onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                  placeholder="Cloudinary image URL"
                />
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                  placeholder="Product description"
                  rows="2"
                />
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={editingProduct.inStock || false}
                    onChange={(e) => setEditingProduct({...editingProduct, inStock: e.target.checked})}
                  />
                  <span>In Stock</span>
                </label>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={saveProduct} disabled={updating}>
                {updating ? '⏳ Saving...' : '💾 Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;