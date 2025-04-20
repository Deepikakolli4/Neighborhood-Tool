import React, { useState, useEffect } from 'react';
import ReviewList from '../Review/review';
import DamageReportList from '../DamageReport/damage';
import ReservationList from '../Reservation/reservation';
// import './toolDetail.css';

const ToolDetail = ({ toolId }) => {
  const [tool, setTool] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/tools/${toolId}`)
      .then((res) => res.json())
      .then((data) => setTool(data))
      .catch((err) => console.error(err));
  }, [toolId]);

  if (!tool) return <div>Loading...</div>;

  return (
    <div className="tool-detail">
      <h1>{tool.name}</h1>
      <p>{tool.description}</p>
      <p><strong>Category:</strong> {tool.category}</p>
      <p><strong>Available:</strong> {tool.isAvailable ? 'Yes' : 'No'}</p>
      <ReviewList toolId={toolId} />
      <DamageReportList toolId={toolId} />
      <ReservationList toolId={toolId} />
    </div>
  );
};

export default ToolDetail;
