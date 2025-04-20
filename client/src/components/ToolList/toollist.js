import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './toollist.css';

const ToolList = () => {
  const [tools, setTools] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const toolsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/tools');
        if (!res.ok) throw new Error('Failed to fetch tools');
        const data = await res.json();
        setTools(data);
      } catch (err) {
        console.error('Error fetching tools:', err);
        setError(err.message);
      }
    };

    fetchTools();
  }, []);

  // Pagination logic
  const indexOfLastTool = currentPage * toolsPerPage;
  const indexOfFirstTool = indexOfLastTool - toolsPerPage;
  const currentTools = tools.slice(indexOfFirstTool, indexOfLastTool);
  const totalPages = Math.ceil(tools.length / toolsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (error) return <p className="error">{error}</p>;

  const handleToolClick = (id) => {
    navigate(`/tools/${id}`);
  };

  return (
    <div className="tool-list-container">
      <h2>Available Tools</h2>
      <div className="tool-list">
        {currentTools.map((tool) => (
          <div key={tool._id} className="tool-item" onClick={() => handleToolClick(tool._id)}>
            <h3>{tool.name}</h3>
            <p>{tool.description}</p>
            {tool.imageUrl && (
              <img
                src={tool.imageUrl}
                alt={tool.name}
                className="tool-image"
                onError={(e) => (e.target.style.display = 'none')}
              />
            )}
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          ⬅ Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default ToolList;
