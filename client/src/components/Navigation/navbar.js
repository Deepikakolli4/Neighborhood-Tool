import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './navbar.css';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <NavLink to="/" className="navbar-brand">Tool Library</NavLink>
        <div className="navbar-links">
          <NavLink to="/tools" activeClassName="active">Tools</NavLink>
          <NavLink to="/about" activeClassName="active">About</NavLink>
          <NavLink to="/features" activeClassName="active">Features</NavLink>
          {user ? (
            <>
              <NavLink to="/reservations" activeClassName="active">Reservations</NavLink>
              <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
              {user.role === 'admin' && <NavLink to="/admin" activeClassName="active">Admin</NavLink>}
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" activeClassName="active">Login</NavLink>
              <NavLink to="/signup" activeClassName="active">Signup</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
