import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function LimoList() {
  const [limos, setLimos] = useState([]);

  useEffect(() => {
    fetch('/api/limos')
      .then((res) => res.json())
      .then((limosData) => setLimos(limosData))
      .catch((error) => console.error('Error fetching limos:', error));
  }, []);

  if (limos.length === 0) {
    return <div>Loading...</div>;
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