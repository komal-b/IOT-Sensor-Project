// src/components/DashboardCards.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardCards = () => {
  const [alerts, setAlerts] = useState([]);
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alertsRes = await axios.get('http://127.0.0.1:8000/api/alerts');
        const machinesRes = await axios.get('http://127.0.0.1:8000/api/top-machines');

        setAlerts(alertsRes.data);
        setMachines(machinesRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard cards:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loader"></div>;

  return (
    <div className="cards-container">
      <div className="card">
        <h3>Total Alerts</h3>
        <p>{alerts.length}</p>
      </div>
      <div className="card">
        <h3>Total Machines</h3>
        <p>{machines.length}</p>
      </div>
    </div>
  );
};

export default DashboardCards;
