import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BookingForm from './BookingForm';

function LimoDetail({ isLoggedIn }) {
  const { limoId } = useParams();
  const [limo, setLimo] = useState(null);

  useEffect(() => {
    fetch(`/api/limo/${limoId}`)
      .then((res) => res.json())
      .then((limoData) => setLimo(limoData))
      .catch((error) => console.error('Error fetching limo:', error));
  }, [limoId]);

  if (!limo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="limo-detail-container">
      <h2 className="limo-name">{limo.name}</h2>
      <img
        src={limo.image_url}
        alt={limo.name}
        className="limo-image-detailed"
      />
      <p className="limo-description">Description: {limo.description}</p>
      <p className="limo-price">Price per Hour: ${limo.price_per_hour}</p>

      {isLoggedIn ? (
        <BookingForm limoId={limoId} />
      ) : (
        <div className="login-section">
          <p>Please login or sign up to make a booking.</p>
          <div className="login-buttons">
            <Link to="/login" className="login-button">
              <button>Login</button>
            </Link>
            <span> or </span>
            <Link to="/signup" className="signup-button">
              <button>Sign Up</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default LimoDetail;
