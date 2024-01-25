import React, { useState, useEffect } from 'react';

function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/review');
        if (response.ok) {
          const reviewsData = await response.json();
          setReviews(reviewsData);
        } else {
          console.error('Failed to fetch reviews');
        }
      } catch (error) {
        console.error('Error during review fetch:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <div>
          <p>All reviews are anonymous, and from our booked clients directly!</p>
          {reviews.map((review) => (
            <div key={review.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
              <h3>Rating: {review.rating}/10</h3>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewList;
