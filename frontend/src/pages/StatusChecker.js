import React, { useState } from 'react';
import axios from 'axios';

export default function StatusChecker() {
  const [trackingId, setTrackingId] = useState('');
  const [incident, setIncident] = useState(null);

  const checkStatus = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/incidents/status/${trackingId}`);
      setIncident(res.data);
    } catch {
      alert("Tracking ID not found.");
    }
  };

  return (
    <div className="container">
      <h2>Check Report Status</h2>
      <input onChange={e => setTrackingId(e.target.value)} placeholder="Enter Tracking ID" />
      <button onClick={checkStatus}>Check</button>

      {incident && (
        <div>
          <h3>Status</h3>
          <p>Department: {incident.department}</p>
          <p>Region: {incident.region}</p>
          <p>Date: {new Date(incident.date).toLocaleString()}</p>
          <p>Description: {incident.description}</p>
          <p>Status: {incident.verified ? "✅ Verified" : "⏳ Pending"}</p>
          {incident.adminNote && <p>Admin Note: {incident.adminNote}</p>}
        </div>
      )}
    </div>
  );
}
