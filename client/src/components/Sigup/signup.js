import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
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
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const { token, user } = await res.json();
        await login(formData.email, formData.password); // Log in after signup
        navigate('/dashboard');
      } else {
        const { message } = await res.json();
        setError(message || 'Signup failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSignup}>
      <h2 className="signup-title">Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="signup-input"
        value={formData.name}
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