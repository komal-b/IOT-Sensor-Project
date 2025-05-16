import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FailureStatsCard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/failure-stats')
      .then(res => setStats(res.data))
      .catch(err => console.error("❌ Failure stats error", err));
  }, []);

  if (!stats) return <div className="loader"></div>;

  return (
    <div className="card compact">
      <h3 className="card-title">🚨 Sensor Failures</h3>
      <p><strong>In last 15 min:</strong> {stats.failures_last_15_min}</p>
      <p><strong>Top failing sensors:</strong></p>
      <ul>
        {Object.entries(stats.top_failing_sensors).map(([id, count]) => (
          <li key={id}><strong>{id}</strong> — {count} times</li>
        ))}
      </ul>
    </div>
  );
};

export default FailureStatsCard;
