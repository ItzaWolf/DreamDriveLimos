import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BookingForm from './BookingForm';

function LimoDetail() {
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
    <div>
      <h2>{limo.name}</h2>
      <img src={limo.image_url} alt={limo.name} style={{ width: '100%', maxWidth: '800px', height: 'auto', borderRadius: '50px' }} />
      <p>Description: {limo.description}</p>
      <p>Price per Hour: ${limo.price_per_hour}</p>
      <BookingForm limoId={limoId} />
    </div>
  );
}

export default LimoDetail;