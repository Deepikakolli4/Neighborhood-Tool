import { Link } from 'react-router-dom';
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Neighborhood Tool Library</h3>
            <p>Share tools, build community.</p>
          </div>
          <div className="footer-section">
            <h3>Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/tools">Tools</Link></li>
              <li><Link to="/reservations">Reservations</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: info@toollibrary.com </p>
            {/* <p>Phone: (123) 456-7890</p> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;