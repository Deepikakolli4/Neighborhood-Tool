import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '', // Change `name` to `username`
    email: '',
    password: '',
    role: 'member',
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://neighbour-backend-2.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const { token, user } = await res.json();
        try {
          console.log('Signup successful, navigating to login page'); // Log successful signup
          navigate('/login');
        } catch (loginError) {
          console.error('Navigation error:', loginError); // Log any errors during navigation
          setError('Signup successful, but navigation failed. Please try logging in.');
        }
      } else {
        const errorResponse = await res.json();
        console.error('Signup error response:', errorResponse); // Log the error response
        setError(errorResponse.message || 'Signup failed'); 
      }
    } catch (err) {
      console.error('Signup server error:', err); // Log the error object
      setError('Server error. Please try again later.');
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSignup}>
      <h2 className="signup-title">Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        name="username" // Change `name` to `username`
        placeholder="Username"
        className="signup-input"
        value={formData.username} // Change `formData.name` to `formData.username`
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="signup-input"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="signup-input"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <select
        name="role"
        className="signup-input"
        value={formData.role}
        onChange={handleChange}
      >
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" className="signup-button">Create Account</button>
    </form>
  );
};

export default Signup;