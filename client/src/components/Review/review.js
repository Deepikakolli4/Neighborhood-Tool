import { useState, useEffect } from 'react';
import './review.css';

const ReviewForm = ({ toolId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ tool: toolId, rating, comment }),
      });
      setRating(5);
      setComment('');
    } catch (err) {
      console.error(err);
    }
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
          {[1, 2, 3, 4, 5].map((num) => (
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
}

export function ReviewList({ toolId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/reviews?tool=${toolId}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  }, [toolId]);

  return (
    <div className="review-list">
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="review-card">
            <p><strong>Rating:</strong> {review.rating}/5</p>
            <p><strong>Comment:</strong> {review.comment}</p>
            <p><strong>User:</strong> {review.user.name}</p>
          </div>
        ))
      )}
    </div>
  );
}
export default ReviewForm;