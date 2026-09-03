import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch authenticated user profile on mount
    const fetchProfile = async () => {
      try {
        const response = await api.get('/customers/me');
        setUser(response.data);
      } catch (err) {
        // If authentication fails (401), navigate to login
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="welcome-card">
          <h1>Welcome to ShopKart, {user.fullName}!</h1>
          <p className="welcome-subtext">You are logged in securely.</p>

          <div className="profile-info">
            <h3>Customer Profile</h3>
            <p><strong>Name:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
