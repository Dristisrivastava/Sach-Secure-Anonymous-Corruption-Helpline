import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function IncidentList() {
  const [incidents, setIncidents] = useState([]);
  const [region, setRegion] = useState('');
const [notes, setNotes] = useState({});

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/incidents${region ? '?region=' + region : ''}`
        );
        setIncidents(response.data);
      } catch (err) {
        console.error("Error fetching incidents", err);
      }
    };

    fetchIncidents();
  }, [region]);

 const verifyIncident = async (id, note) => {
  try {
    await axios.put(`http://localhost:5000/api/incidents/${id}/verified`, { note });
    setIncidents(prev =>
      prev.map(i => (i._id === id ? { ...i, verified: true, note } : i))
    );
  } catch (err) {
    console.error("Error verifying incident", err);
  }
};


  return (
    <div className="container">
      <h2>All Reports</h2>

      <label htmlFor="regionInput"><strong>Filter by Region:</strong></label>
      <input
        type="text"
        id="regionInput"
        placeholder="e.g. North, East, etc."
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        style={{ padding: '8px', margin: '10px 0', width: '300px' }}
      />
      <ul>
       {incidents.map(incident => (
  <li key={incident._id}>
    <p><strong>{incident.department}</strong> – {incident.region}</p>
    <p>{incident.description}</p>
    <p>Status: {incident.verified ? "✅ Verified" : "⏳ Pending"}</p>

    {!incident.verified && (
      <>
        <input
          type="text"
          placeholder="Add admin note..."
          value={notes[incident._id] || ''}
          onChange={(e) =>
            setNotes({ ...notes, [incident._id]: e.target.value })
          }
          style={{ marginRight: '10px' }}
        />
        <button onClick={() => verifyIncident(incident._id, notes[incident._id])}>
          Verify
        </button>
      </>
    )}

    {incident.verified && incident.note && (
      <p><strong>Admin Note:</strong> {incident.note}</p>
    )}

    <hr />
  </li>
))}

      </ul>
    </div>
  );
}
