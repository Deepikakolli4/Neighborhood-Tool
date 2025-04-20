import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ToolCard from '../ToolCard/toolcard';
import './toolfilter.css';

function ToolList() {
  const [tools, setTools] = useState([]);
  const [category, setCategory] = useState('');
  const [available, setAvailable] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (category) queryParams.append('category', category);
    if (available) queryParams.append('available', true);
    if (search) queryParams.append('search', search);

    fetch(`http://localhost:5000/api/tools?${queryParams.toString()}`)
      .then((res) => res.json())
      .then((data) => setTools(data))
      .catch((err) => console.error(err));
  }, [category, available, search]);

  return (
    <div className="tool-list">
      <div className="container">
        <h1>Tool Library</h1>
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="Gardening">Gardening</option>
              <option value="Power Tools">Power Tools</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="available">
              <input
                type="checkbox"
                id="available"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
              />
              Show Available Only
            </label>
          </div>
          <div className="filter-group">
            <label htmlFor="search">Search by Name:</label>
            <input
              type="text"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter tool name"
            />
          </div>
        </div>
        <div className="tool-grid">
          {tools.length === 0 ? (
            <p>No tools found.</p>
          ) : (
            tools.map((tool) => (
              <Link to={`/tools/${tool._id}`} key={tool._id}>
                <ToolCard tool={tool} />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ToolList;