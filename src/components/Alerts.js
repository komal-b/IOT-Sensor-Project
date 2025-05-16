// src/components/Alerts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/alerts')
      .then(response => setAlerts(response.data))
      .catch(error => console.error('Error fetching alerts:', error));
  }, []);

  return (
    <div>
      <h2>Alerts</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Sensor ID</th>
            <th>Machine ID</th>
            <th>Temp (°C)</th>
            <th>Pressure (psi)</th>
            <th>Vibration (Hz)</th>
            <th>Battery (%)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert, index) => (
            <tr key={index}>
              <td>{alert.timestamp}</td>
              <td>{alert.sensor_id}</td>
              <td>{alert.machine_id}</td>
              <td>{alert.temp_C}</td>
              <td>{alert.pressure_psi}</td>
              <td>{alert.vibration_Hz}</td>
              <td>{alert.battery_pct}</td>
              <td>{alert.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Alerts;
