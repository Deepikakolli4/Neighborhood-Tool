import { Link } from 'react-router-dom';
import './toolcard.css';

const ToolCard = ({ tool }) => {
  return (
    <div className="tool-card">
      {tool.imageUrl && <img src={tool.imageUrl} alt={tool.name} className="tool-image" />}
      <h3 className="tool-name">{tool.name}</h3>
      <p className="tool-desc">{tool.description}</p>
      <p className="tool-status">
        {tool.isAvailable ? 'Available' : 'Unavailable'}
      </p>
      <Link to={`/tools/${tool._id}`} className="tool-link">View Details</Link>
    </div>
  );
};

export default ToolCard;