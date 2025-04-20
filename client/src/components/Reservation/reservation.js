import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './reservation.css';

function ReservationDashboard() {
  const [reservations, setReservations] = useState([]);
  const [reminders, setReminders] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Fetch reservations
    fetch('http://localhost:8000/api/reservations', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setReservations(data))
      .catch((err) => console.error(err));

    // Fetch reminders (upcoming reservations within 3 days)
    fetch('http://localhost:5000/api/reservations/reminders', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setReminders(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="reservation-dashboard">
      <div className="container">
        <h1>Your Reservations</h1>
        <div className="reservation-list">
          {reservations.length === 0 ? (
            <p>No reservations found.</p>
          ) : (
            reservations.map((reservation) => (
              <div key={reservation._id} className="reservation-card">
                <h2>{reservation.tool.name}</h2>
                <p><strong>Start Date:</strong> {new Date(reservation.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(reservation.endDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {reservation.status}</p>
                <div className="qr-code">
                  <img
                    src={`http://localhost:5000/api/qr/reservation/${reservation._id}`}
                    alt="Reservation QR Code"
                  />
                  <p>Scan to view reservation details</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="reminders">
          <h2>Upcoming Reminders</h2>
          {reminders.length === 0 ? (
            <p>No upcoming reservations.</p>
          ) : (
            reminders.map((reminder) => (
              <div key={reminder._id} className="reminder-card">
                <p><strong>Tool:</strong> {reminder.tool.name}</p>
                <p><strong>Start Date:</strong> {new Date(reminder.startDate).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ReservationDashboard;