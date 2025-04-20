import React from 'react';
import './dashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2 className="admin-title">Admin Dashboard</h2>
      <div className="admin-buttons">
        <button className="admin-btn">Add Tool</button>
        <button className="admin-btn">Manage Reservations</button>
        <button className="admin-btn">Resolve Damage Reports</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
