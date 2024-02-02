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

  const limosByType = limos.reduce((acc, limo) => {
    acc[limo.type] = [...(acc[limo.type] || []), limo];
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(limosByType).map(([type, limosOfType]) => (
        <div className="limo-list-type" key={type}>
          <h2>{type}</h2>
          <ul className="limo-list">
            {limosOfType.map((limo) => (
              <li key={limo.id} className="limo-item">
                <Link to={`/limo/${limo.id}`}>
                  <img className="limo-image" src={limo.image_url} alt={limo.name} />
                  <p>{limo.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default LimoList;
