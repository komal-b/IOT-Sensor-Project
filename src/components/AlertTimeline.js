import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AlertTimeline = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const lastAlertId = useRef(null); // Track last seen alert

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000); // Every 5 sec
    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/alerts');
      const reversed = response.data.reverse();
      setAlerts(reversed);
      setLoading(false);

      // Check for new alert
      if (reversed.length > 0 && reversed[0].status === 'ALERT') {
        if (reversed[0].sensor_id !== lastAlertId.current) {
          lastAlertId.current = reversed[0].sensor_id;
          toast.error(`🚨 ALERT: Sensor ${reversed[0].sensor_id} | Machine ${reversed[0].machine_id} | Temp: ${reversed[0].temp_C}°C`, {
            position: "bottom-right",
            autoClose: 5000,
          });
        }
      }

    } catch (error) {
      console.error('❌ Error fetching alerts:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loader"></div>;

  const displayedAlerts = showAll ? alerts : alerts.slice(0, 6);

  return (
    <div>
      <h2 className="card-title">🚨 Live Alert Timeline</h2>
      <div className="alert-list">
        {displayedAlerts.map((alert, index) => (
          <div
            key={index}
            className={`timeline-item ${alert.status === "ALERT" ? "alert" : "ok"}`}
          >
            <div className="timestamp">{alert.timestamp}</div>
            <div className="content">
              <strong>Sensor:</strong> {alert.sensor_id}<br />
              <strong>Machine:</strong> {alert.machine_id}<br />
              <strong>Temp:</strong> {alert.temp_C}°C<br />
              <strong>Status:</strong> {alert.status}
            </div>
          </div>
        ))}
      </div>

      {alerts.length > 6 && (
        <button
          className="toggle-button"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

export default AlertTimeline;
