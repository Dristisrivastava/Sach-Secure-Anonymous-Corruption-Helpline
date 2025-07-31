import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StatsHeatmap() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/incidents/stats`)
      .then(res => setStats(res.data));
  }, []);

  return (
    <div className="container">
      <h2>📊 Incident Heatmap</h2>
      <ul>
        {stats.map(item => (
          <li key={item._id}>
            <strong>{item._id}</strong>: {item.count} incident(s)
          </li>
        ))}
      </ul>
    </div>
  );
}
