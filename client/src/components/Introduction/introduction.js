import React from 'react';
import './introduction.css';

const Introduction = () => {
  return (
    <section className="intro-section">
      <h1 className="intro-title">Welcome to the Neighborhood Tool Library</h1>
      <p className="intro-subtitle">
        Borrow tools. Share resources. Build together.
      </p>
      <button className="intro-button">Explore Tools</button>
    </section>
  );
};

export default Introduction;
