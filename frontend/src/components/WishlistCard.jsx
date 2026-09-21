import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WishlistCard({ product, onRemove }) {
  const navigate = useNavigate();
  const [removing, setRemoving] = useState(false);

  const handleViewDetails = () => {
    navigate(`/products/${product._id}`);
  };

  const handleRemove = async () => {
    if (removing) return;
    setRemoving(true);
    try {
      await onRemove(product._id);
    } catch (err) {
      setRemoving(false);
    }
  };

  return (
    <div className="product-card wishlist-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      </div>

      <div className="product-card-body">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.name}</h3>
        
        <div className="product-price-stock">
          <span className="product-price">₹{product.price}</span>
          <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0 ? `${product.stock} units left` : 'Out of Stock'}
          </span>
        </div>

        <div className="product-card-actions">
          <button onClick={handleViewDetails} className="btn-view-details">
            View Details
          </button>
          
          <button 
            onClick={handleRemove} 
            disabled={removing}
            className="btn-remove-wishlist"
          >
            {removing ? 'Removing...' : 'Remove ♥'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default WishlistCard;
