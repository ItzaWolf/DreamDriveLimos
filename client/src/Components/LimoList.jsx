import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function LimoList() {
  const [limos, setLimos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/limos')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Unauthorized');
        }
      })
      .then((limosData) => setLimos(limosData))
      .catch((error) => {
        console.error('Error fetching limos:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!limos || limos.length === 0) {
    return <div>No limos available.</div>;
  }

  return (
    <div>
      <h2>Limos</h2>
      <ul className="limo-list">
        {limos.map((limo) => (
          <li key={limo.id} className="limo-item">
            <Link to={`/limo/${limo.id}`}>
              <img className='limo-image' src={limo.image_url} alt={limo.name} />
              <p>{limo.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LimoList;