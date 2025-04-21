import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
// import './welcome.css';

const Welcome = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="welcome-page">
      <h1>Welcome, {user?.username}!</h1>
      <p>We're glad to have you here. Explore the tools and make reservations!</p>
    </div>
  );
};

export default Welcome;
