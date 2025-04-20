import React, { useState, useEffect } from 'react';
import './damage.css';

const DamageReport = () => {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ description, file });
    // handle damage report submit logic
  };

  return (
    <form className="damage-report-form" onSubmit={handleSubmit}>
      <h2 className="damage-title">Report Damage</h2>
      <textarea
        placeholder="Describe the damage..."
        className="damage-textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="file"
        className="damage-file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit" className="damage-submit">Submit Report</button>
    </form>
  );
};

const DamageReportList = ({ toolId }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/reports?tool=${toolId}`)
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((err) => console.error(err));
  }, [toolId]);

  return (
    <div className="damage-report-list">
      <h2>Damage Reports</h2>
      {reports.length === 0 ? (
        <p>No damage reports yet.</p>
      ) : (
        reports.map((report) => (
          <div key={report._id} className="damage-report-card">
            <p><strong>Description:</strong> {report.description}</p>
            <p><strong>Reported By:</strong> {report.user.name}</p>
          </div>
        ))
      )}
    </div>
  );
};

export { DamageReport, DamageReportList }; // Ensure both are exported
