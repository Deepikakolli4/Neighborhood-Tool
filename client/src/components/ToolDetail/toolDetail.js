import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './toolDetail.css';

function ToolDetail() {
  const { id } = useParams();
  const [tool, setTool] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/tools/${id}`);
        if (!res.ok) throw new Error('Failed to fetch tool details');
        const data = await res.json();
        setTool(data);
      } catch (err) {
        console.error('Error fetching tool details:', err);
        setError(err.message);
      }
    };

    fetchTool();
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!tool) return <p>Loading...</p>;

  return (
    <div className="tool-detail">
      <h1>{tool.name}</h1>
      <div className="tool-info-wrapper">
        <div className="tool-image">
          {tool.imageUrl && <img src={tool.imageUrl} alt={tool.name} />}
        </div>
        <div className="tool-info">
          <p><strong>Description:</strong> {tool.description}</p>
          <p><strong>Category:</strong> {tool.category}</p>
          <p><strong>Available:</strong> {tool.isAvailable ? 'Yes' : 'No'}</p>
          <div className="tool-actions">
            <button className="reserve-button">Reserve</button>
            <button className="review-button">Review</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToolDetail;
