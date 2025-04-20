import React, { useState } from 'react';
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

export default DamageReport;
