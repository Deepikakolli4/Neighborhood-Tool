import React from 'react';
import ToolCard from './ToolCard';
import './toollist.css';

const ToolList = ({ tools }) => {
  return (
    <div className="tool-list">
      {tools.length === 0 ? (
        <p className="tool-empty">No tools available at the moment.</p>
      ) : (
        tools.map((tool) => <ToolCard key={tool.id} tool={tool} />)
      )}
    </div>
  );
};

export default ToolList;
