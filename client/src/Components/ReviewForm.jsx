import React, { useState, useEffect } from 'react';

function ReviewForm({ onReviewSubmit }) {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [user_id, setUser_id] = useState(null);

  useEffect(() => {
    // Fetch user_id from check_session
    fetch('/api/check_session')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((userData) => {
        if (userData) {
          setUser_id(userData.id); // Assuming user_id is available in the response
        }
      })
      .catch((error) => {
        console.error('Error during check session:', error);
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        rating: parseInt(rating, 10),
        comment,
      }),
    });

    if (response.ok) {
      setRating('');
      setComment('');

      if (onReviewSubmit) {
        onReviewSubmit();
      }

      console.log('Review submitted successfully');
    } else {
      console.error('Failed to submit review');
    }
  };

  return (
    <div>
      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="10"
            required
          />
        </label>
        <br />
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewForm;
