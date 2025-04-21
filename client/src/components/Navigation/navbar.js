import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './navbar.css';

function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return null; // or show a loading spinner

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">Tool Library</NavLink>
        <div className="navbar-menu">
          <NavLink to="/tools" className="navbar-link" activeClassName="active">Tools</NavLink>
          <NavLink to="/about" className="navbar-link" activeClassName="active">About</NavLink>
          <NavLink to="/features" className="navbar-link" activeClassName="active">Features</NavLink>
          {user ? (
            <>
              <NavLink to="/reservations" className="navbar-link" activeClassName="active">Reservations</NavLink>
              <NavLink to="/dashboard" className="navbar-link" activeClassName="active">Dashboard</NavLink>
              {user.role === 'admin' && (
                <NavLink to="/admin" className="navbar-link" activeClassName="active">Admin</NavLink>
              )}
              <span className="navbar-username">{user.username}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="navbar-link" activeClassName="active">Login</NavLink>
              <NavLink to="/signup" className="navbar-link" activeClassName="active">Signup</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
