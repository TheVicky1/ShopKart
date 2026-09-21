import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToWishlist, removeFromWishlist } from '../services/api';

function ProductCard({ product, initialInWishlist = false, onWishlistUpdate }) {
  const navigate = useNavigate();
  const [inWishlist, setInWishlist] = useState(initialInWishlist);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleViewDetails = () => {
    navigate(`/products/${product._id}`);
  };

  // Lab 04: Handle Wishlist Toggle (Add / Remove)
  const handleWishlistToggle = async () => {
    if (saving) return; // Prevent duplicate clicks while request is running
    setSaving(true);
    setErrorMessage('');

    try {
      if (inWishlist) {
        // Call DELETE /wishlist/:productId
        await removeFromWishlist(product._id);
        setInWishlist(false);
      } else {
        // Call POST /wishlist/:productId
        await addToWishlist(product._id);
        setInWishlist(true);
      }

      // Trigger optional callback for parent components (e.g. updating Navbar badge)
      if (onWishlistUpdate) {
        onWishlistUpdate();
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Redirect unauthenticated user to login
        navigate('/login');
      } else if (err.response && err.response.status === 409) {
        // Already in wishlist (409 Conflict)
        setInWishlist(true);
      } else {
        setErrorMessage('Unable to save product. Please try again.');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
        {/* Heart Wishlist Overlay Badge */}
        <button 
          onClick={handleWishlistToggle}
          disabled={saving}
          className={`wishlist-heart-btn ${inWishlist ? 'saved' : ''}`}
          title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          {saving ? '⏳' : inWishlist ? '♥' : '♡'}
        </button>
      </div>

      <div className="product-card-body">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-price-stock">
          <span className="product-price">₹{product.price}</span>
          <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0 ? `${product.stock} units left` : 'Out of Stock'}
          </span>
        </div>

        {errorMessage && (
          <div className="card-error-message">
            {errorMessage}
          </div>
        )}

        <div className="product-card-actions">
          <button onClick={handleViewDetails} className="btn-view-details">
            View Details
          </button>
          
          <button 
            onClick={handleWishlistToggle} 
            disabled={saving}
            className={`btn-wishlist-action ${inWishlist ? 'btn-wishlist-saved' : ''}`}
          >
            {saving ? '⏳ Saving...' : inWishlist ? '♥ Saved' : '♡ Wishlist'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
