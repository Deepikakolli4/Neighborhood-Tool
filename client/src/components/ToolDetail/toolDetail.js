import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import   ReviewForm  from '../Review/review';
import  DamageReport from '../DamageReport/damage';
import './toolDetail.css';

function ToolDetail() {
  const { id } = useParams();
  const [tool, setTool] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/tools/${id}`)
      .then((res) => res.json())
      .then((data) => setTool(data))
      .catch(() => setError('Failed to load tool'));
  }, [id]);

  const handleReserve = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ tool: id, startDate, endDate }),
      });
      if (res.ok) {
        navigate('/reservations');
      } else {
        setError('Reservation failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  if (!tool) return <div>Loading...</div>;

  return (
    <div className="tool-detail">
      <div className="container">
        <h1>{tool.name}</h1>
        {error && <p className="error">{error}</p>}
        <div className="tool-info">
          <p><strong>Description:</strong> {tool.description}</p>
          <p><strong>Category:</strong> {tool.category}</p>
          <p><strong>Available:</strong> {tool.isAvailable ? 'Yes' : 'No'}</p>
          {tool.imageUrl && <img src={tool.imageUrl} alt={tool.name} />}
        </div>
        {user && (
          <form onSubmit={handleReserve} className="reservation-form">
            <h2>Reserve Tool</h2>
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn">Reserve</button>
          </form>
        )}
        <ReviewList toolId={id} />
        {user && <ReviewForm toolId={id} />}
        <DamageReportList toolId={id} />
        {user && <DamageReport toolId={id} />}
      </div>
    </div>
  );
}

export default ToolDetail;