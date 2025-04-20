import React, { useState } from 'react';
import './review.css';

const ReviewForm = () => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, comment });
    // send review to backend
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h2 className="review-title">Leave a Review</h2>
      <label className="review-label">
        Rating:
        <select
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="review-select"
        >
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </label>
      <textarea
        placeholder="Write your comment here..."
        className="review-textarea"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button type="submit" className="review-button">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
