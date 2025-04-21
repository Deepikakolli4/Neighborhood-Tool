import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './toollist.css';

const ToolList = () => {
  const [tools, setTools] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const toolsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await fetch('https://neighbour-backend-2.onrender.com/api/tools');
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

  // Filter tools based on search, category, availability
  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? tool.category === selectedCategory : true;
    const matchesAvailability = selectedAvailability
      ? (selectedAvailability === 'Available' ? tool.available : !tool.available)
      : true;

    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const totalPages = Math.ceil(filteredTools.length / toolsPerPage);
  const indexOfLastTool = currentPage * toolsPerPage;
  const indexOfFirstTool = indexOfLastTool - toolsPerPage;
  const currentTools = filteredTools.slice(indexOfFirstTool, indexOfLastTool);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleToolClick = (id) => {
    navigate(`/tools/${id}`);
  };

  // Unique category list for dropdown
  const categoryOptions = [...new Set(tools.map((tool) => tool.category))];

  return (
    <div className="tool-list-container">
      <h2>Available Tools</h2>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search tools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select value={selectedAvailability} onChange={(e) => setSelectedAvailability(e.target.value)}>
          <option value="">All</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
      </div>

      {/* Tool List */}
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
            <p className="availability-tag">{tool.available ? 'Available' : 'Unavailable'}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>⬅ Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>Next ➡</button>
      </div>
    </div>
  );
};

export default ToolList;
