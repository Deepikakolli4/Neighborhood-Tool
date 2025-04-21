import React from 'react';
import { useNavigate } from 'react-router-dom';
import './introduction.css';

const Introduction = () => {
  const navigate = useNavigate();

  const handleExploreTools = () => {
    navigate('/tools'); 
  };

  return (
    <section className="intro-section">
      <h1 className="intro-title">Welcome to the Neighborhood Tool Library</h1>
      <p className="intro-subtitle">
        Borrow tools. Share resources. Build together.
      </p>
      <button className="intro-button" onClick={handleExploreTools}>Explore Tools</button>
    </section>
  );
};

export default Introduction;
