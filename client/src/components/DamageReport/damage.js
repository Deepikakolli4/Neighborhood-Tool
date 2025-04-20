import { useState, useEffect } from 'react';
import './damage.css';

const DamageReport = ({ toolId }) => {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('tool', toolId);
    formData.append('description', description);
    if (file) formData.append('image', file);

    try {
      await fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });
      setDescription('');
      setFile(null);
    } catch (err) {
      console.error(err);
    }
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
}

export function DamageReportList({ toolId }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/reports?tool=${toolId}`)
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
            {report.imageUrl && <img src={report.imageUrl} alt="Damage" className="damage-image" />}
          </div>
        ))
      )}
    </div>
  );
}
export default DamageReport;