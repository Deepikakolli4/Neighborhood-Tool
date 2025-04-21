import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './toolDetail.css';
import { AuthContext } from '../../context/AuthContext';

function ToolDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;

  const [tool, setTool] = useState(null);
  const [error, setError] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [dateError, setDateError] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState([new Date(), new Date()]);
  const [reviews, setReviews] = useState([]);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (reservationSuccess) {
      const timer = setTimeout(() => setReservationSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [reservationSuccess]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [toolRes, reviewsRes, datesRes] = await Promise.all([
          fetch(`http://localhost:8000/api/tools/${id}`),
          fetch(`http://localhost:8000/api/reviews/tool/${id}`),
          fetch(`http://localhost:8000/api/reservations/unavailable/${id}`),
        ]);

        if (!toolRes.ok) throw new Error('Failed to fetch tool details');
        if (!reviewsRes.ok) throw new Error('Failed to fetch reviews');
        if (!datesRes.ok) throw new Error('Failed to fetch unavailable dates');

        const toolData = await toolRes.json();
        const reviewData = await reviewsRes.json();
        const dateData = await datesRes.json();

        setTool(toolData);
        setReviews(reviewData);
        setUnavailableDates(dateData);
        setError('');
        setReviewError('');
        setDateError('');
      } catch (err) {
        console.error(err);
        if (err.message.includes('tool')) setError(err.message);
        else if (err.message.includes('review')) setReviewError(err.message);
        else setDateError(err.message);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  const handleReserve = () => {
    if (!isLoggedIn) {
      alert('Please log in to reserve this tool.');
      navigate('/login');
      return;
    }
    setShowCalendar(true);
  };

  const handleDateChange = async (dates) => {
    const [startDate, endDate] = dates;
    if (endDate < startDate) {
      alert('End date must be after start date');
      return;
    }

    setSelectedDates(dates);

    try {
      const res = await fetch('http://localhost:8000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          tool: id,
          startDate,
          endDate,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to reserve tool');
      }

      alert('Reservation successful!');
      setReservationSuccess(true);
      setShowCalendar(false);
      setSelectedDates([new Date(), new Date()]);

      // Refresh unavailable dates
      const newDatesRes = await fetch(`http://localhost:8000/api/reservations/unavailable/${id}`);
      if (newDatesRes.ok) {
        const newDates = await newDatesRes.json();
        setUnavailableDates(newDates);
      }
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to reserve tool');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Please log in to leave a review.');
      navigate('/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ tool: id, rating, comment }),
      });

      if (!res.ok) throw new Error('Failed to submit review');

      const newReview = await res.json();
      setReviews((prev) => [...prev, newReview]);
      setRating(1);
      setComment('');
      alert('Review submitted successfully!');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to submit review');
    }
  };

  const isDateDisabled = ({ date }) => {
    return unavailableDates.some((d) => new Date(d).toDateString() === date.toDateString());
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="tool-detail">
      <div className="tool-wrapper">
        <div className="tool-image">
          {tool.imageUrl && <img src={tool.imageUrl} alt={tool.name} />}
        </div>
        <div className="tool-info">
          <p><strong>Description:</strong> {tool.description}</p>
          <p><strong>Category:</strong> {tool.category}</p>
          <p><strong>Available:</strong> {tool.available ? 'Yes' : 'No'}</p>
          <button className="reserve-button" onClick={handleReserve}>
            Reserve
          </button>
        </div>
      </div>

      {dateError && <p className="error">{dateError}</p>}

      {showCalendar && (
        <div className="calendar-container">
          <h3>Select Reservation Dates:</h3>
          <Calendar
            selectRange
            onChange={handleDateChange}
            value={selectedDates}
            tileDisabled={isDateDisabled}
          />
        </div>
      )}

      {reservationSuccess && (
        <p className="success-message">Your reservation has been successfully created!</p>
      )}

      <div className="tool-reviews">
        <h3>User Reviews</h3>
        {reviewError ? (
          <p className="error">{reviewError}</p>
        ) : reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review">
              <strong>{review.user.name}</strong> rated it {review.rating}/5
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>

      {isLoggedIn && (
        <div className="review-form">
          <h3>Leave a Review</h3>
          <form onSubmit={handleReviewSubmit}>
            <label>
              Rating (1–5):
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                required
              />
            </label>
            <label>
              Comment:
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </label>
            <button type="submit">Submit Review</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ToolDetail;
