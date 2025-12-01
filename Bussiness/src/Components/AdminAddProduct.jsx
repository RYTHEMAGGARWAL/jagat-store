// Frontend/src/Components/AdminAddProduct.jsx

import React, { useState } from 'react';
import api from '../utils/api';
import './AdminAddProduct.css';

const AdminAddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'Snacks Munchies',
    price: '',
    oldPrice: '',
    weight: '',
    stock: '100',
    discount: '',
    description: ''
  });
  
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const categories = [
    'Atta Rice Dal',
    'Masala Oil',
    'Cleaning Essentials',
    'Personal Care',
    'Snacks Munchies',
    'Tea Coffee',
    'Dairy Bakery',
    'Home and Offices',
    'Organic & Healthy Living'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto calculate discount
    if (name === 'price' || name === 'oldPrice') {
      const price = name === 'price' ? value : formData.price;
      const oldPrice = name === 'oldPrice' ? value : formData.oldPrice;
      
      if (price && oldPrice && parseFloat(oldPrice) > parseFloat(price)) {
        const discountPercent = Math.round(((oldPrice - price) / oldPrice) * 100);
        setFormData(prev => ({ ...prev, discount: `${discountPercent}% OFF` }));
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match(/^image\/(jpeg|jpg|png|webp|gif)$/)) {
        setMessage({ type: 'error', text: 'Sirf JPG, PNG, WebP images allowed hain!' });
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Image 5MB se kam honi chahiye!' });
        return;
      }
      
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setMessage({ type: '', text: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category) {
      setMessage({ type: 'error', text: 'Name, Price aur Category required hai!' });
      return;
    }
    
    if (!image) {
      setMessage({ type: 'error', text: 'Image select karo!' });
      return;
    }
    
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Create FormData
      const submitData = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          submitData.append(key, formData[key]);
        }
      });
      
      submitData.append('image', image);
      submitData.append('inStock', 'true');

      const response = await api.post('/products', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setMessage({ type: 'success', text: '✅ Product add ho gaya!' });
        
        // Reset form
        setFormData({
          name: '',
          brand: '',
          category: 'Snacks Munchies',
          price: '',
          oldPrice: '',
          weight: '',
          stock: '100',
          discount: '',
          description: ''
        });
        setImage(null);
        setImagePreview(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Product add nahi hua, try again!' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-add-product">
      <h2>🛒 Naya Product Add Karo</h2>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div className="image-upload-section">
          <label>Product Image *</label>
          <div className="upload-area" onClick={() => document.getElementById('image-input').click()}>
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="preview-img" />
            ) : (
              <div className="upload-placeholder">
                <span>📷</span>
                <p>Click karke image select karo</p>
                <small>JPG, PNG, WebP (Max 5MB)</small>
              </div>
            )}
            <input
              type="file"
              id="image-input"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageChange}
              hidden
            />
          </div>
          {imagePreview && (
            <button 
              type="button" 
              className="remove-btn"
              onClick={() => { setImage(null); setImagePreview(null); }}
            >
              ❌ Image Hatao
            </button>
          )}
        </div>

        {/* Product Details */}
        <div className="form-grid">
          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Parle-G Biscuits"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="e.g., Parle"
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Weight/Size</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="e.g., 500g, 1L, 250ml"
            />
          </div>

          <div className="form-group">
            <label>Selling Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., 80"
              required
              min="0"
            />
          </div>
          
          <div className="form-group">
            <label>MRP / Old Price (₹)</label>
            <input
              type="number"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleChange}
              placeholder="e.g., 95"
              min="0"
            />
          </div>
          
          <div className="form-group">
            <label>Discount (Auto)</label>
            <input
              type="text"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              placeholder="Auto calculate hoga"
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="100"
              min="0"
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g., Parle-G Original Glucose Biscuits | Family Pack"
            rows="2"
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? '⏳ Uploading...' : '✅ Product Add Karo'}
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;