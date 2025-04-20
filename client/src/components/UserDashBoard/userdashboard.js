import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './userdashboard.css';

function UserDashboard() {
  const [profile, setProfile] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reports, setReports] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Fetch user profile
    fetch('http://localhost:5000/api/auth/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error(err));

    // Fetch recent reservations
    fetch('http://localhost:5000/api/reservations', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setReservations(data.slice(0, 3)))
      .catch((err) => console.error(err));

    // Fetch recent reviews
    fetch('http://localhost:5000/api/reviews', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setReviews(data.slice(0, 3)))
      .catch((err) => console.error(err));

    // Fetch recent damage reports
    fetch('http://localhost:5000/api/reports', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setReports(data.slice(0, 3)))
      .catch((err) => console.error(err));
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="user-dashboard">
      <div className="container">
        <h1>Welcome, {profile.name}</h1>
        <div className="profile-section">
          <h2>Profile</h2>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.role}</p>
        </div>
        <div className="reservations-section">
          <h2>Recent Reservations</h2>
          {reservations.length === 0 ? (
            <p>No recent reservations.</p>
          ) : (
            reservations.map((reservation) => (
              <div key={reservation._id} className="reservation-card">
                <p><strong>Tool:</strong> {reservation.tool.name}</p>
                <p><strong>Start Date:</strong> {new Date(reservation.startDate).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
        <div className="reviews-section">
          <h2>Recent Reviews</h2>
          {reviews.length === 0 ? (
            <p>No recent reviews.</p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="review-card">
                <p><strong>Tool:</strong> {review.tool.name}</p>
                <p><strong>Rating:</strong> {review.rating}/5</p>
                <p>{review.comment}</p>
              </div>
            ))
          )}
        </div>
        <div className="reports-section">
          <h2>Recent Damage Reports</h2>
          {reports.length === 0 ? (
            <p>No recent damage reports.</p>
          ) : (
            reports.map((report) => (
              <div key={report._id} className="report-card">
                <p><strong>Tool:</strong> {report.tool.name}</p>
                <p>{report.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;