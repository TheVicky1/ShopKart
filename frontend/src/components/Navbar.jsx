import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call backend logout API to clear HttpOnly cookie
      await api.post('/customers/logout');
      // Redirect to login page
      navigate('/login');
    } catch (err) {
      // Navigate to login even if logout API fails or session expired
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/home">ShopKart</Link>
      </div>
      <div className="navbar-menu">
        <Link to="/home" className="nav-item">Home</Link>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
