import React from 'react';
import './toolcard.css';

const ToolCard = ({ tool }) => {
  return (
    <div className="tool-card">
      <img src={tool.image_url} alt={tool.name} className="tool-image" />
      <h3 className="tool-name">{tool.name}</h3>
      <p className="tool-desc">{tool.description}</p>
      <p className="tool-status">
        {tool.available ? 'Available' : 'Unavailable'}
      </p>
    </div>
  );
};

export default ToolCard;
