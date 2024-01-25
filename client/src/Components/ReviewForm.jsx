import React, { useState } from 'react';

function ReviewForm({ onReviewSubmit }) {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // You may want to add validation here before submitting

    const response = await fetch('/api/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rating: parseInt(rating, 10), // Assuming you want to send the rating as an integer
        comment,
      }),
    });

    if (response.ok) {
      // Clear the form on successful submission
      setRating('');
      setComment('');

      // Trigger a callback if provided (e.g., to refresh the list of reviews)
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
