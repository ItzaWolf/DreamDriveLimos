import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm';

function ReviewList({ isLoggedIn }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []); // Fetch reviews when the component mounts

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

  const handleReviewSubmit = () => {
    // When a new review is submitted, fetch the updated list of reviews
    fetchReviews();
  };

  return (
    <div>
      <h2>Reviews</h2>
      {isLoggedIn && <ReviewForm onReviewSubmit={handleReviewSubmit} />}

      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <div>
          <h3>Our Reviews</h3>
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