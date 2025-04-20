import React, { useState } from 'react';
import './signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'member',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(formData);
    // Call signup API here
  };

  return (
    <form className="signup-form" onSubmit={handleSignup}>
      <h2 className="signup-title">Sign Up</h2>
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
