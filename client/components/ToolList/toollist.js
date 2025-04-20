import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ToolList() {
  const [tools, setTools] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/tools')
      .then((res) => res.json())
      .then((data) => setTools(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredTools = category
    ? tools.filter((tool) => tool.category === category)
    : tools;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Tool Library</h1>
      <div className="mb-4">
        <label className="mr-2">Filter by Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="Gardening">Gardening</option>
          <option value="Power Tools">Power Tools</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredTools.map((tool) => (
          <div key={tool._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{tool.name}</h2>
            <p>{tool.description}</p>
            <Link to={`/tools/${tool._id}`} className="text-blue-500">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToolList;