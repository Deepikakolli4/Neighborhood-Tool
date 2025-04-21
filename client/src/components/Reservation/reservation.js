import React, { useEffect, useState } from 'react';
import './reservation.css';

function Reservation({ onClose }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('User not authenticated.');

        const res = await fetch('https://neighbour-backend-2.onrender.com/api/reservations', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to fetch reservations');
        }

        const data = await res.json();
        setReservations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="reservation-container">
      <h3>Your Reservations</h3>

      {loading && <p>Loading reservations...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && reservations.length === 0 && <p>No reservations found.</p>}

      <ul className="reservation-list">
        {reservations.map((reservation) => (
          <li key={reservation._id} className="reservation-item">
            <p><strong>Tool:</strong> {reservation.tool?.name || 'Unknown'}</p>
            <p><strong>From:</strong> {new Date(reservation.startDate).toLocaleDateString()}</p>
            <p><strong>To:</strong> {new Date(reservation.endDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>

      {/* <button className="close-reservation" onClick={onClose}>Close</button> */}
    </div>
  );
}

export default Reservation;
