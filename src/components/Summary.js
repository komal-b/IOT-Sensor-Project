import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MachineTrendModal from './MachineTrendModal';

const Summary = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/summary')
      .then(response => {
        setMachines(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('❌ Error fetching machine summary:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loader"></div>;

  const displayed = showAll ? machines : machines.slice(0, 6);

  return (
    <div>
      <h2 className="card-title">🏭 Machine Health Summary</h2>
    <div className="machine-grid-container">
      <div className="machine-cards-grid">
        {displayed.map((machine, index) => (
          <div
            key={index}
            className="machine-card"
            onClick={() => {
              setSelectedMachine(machine);
              setModalOpen(true);
            }}
            style={{ cursor: 'pointer' }}
          >
            <h3>{machine.machine_id}</h3>
            <p><small>Temp (°C)</small><br />{machine.avg_temp_C?.toFixed(1)}</p>
            <p><small>Pressure</small><br />{machine.avg_pressure_psi?.toFixed(1)}</p>
            <p><small>Vibration</small><br />{machine.avg_vibration_Hz?.toFixed(1)}</p>
          </div>
        ))}
      </div>
    </div>
      {machines.length > 6 && (
        <button
          className="toggle-button"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      )}

      {/* Modal for Trend Chart */}
      <MachineTrendModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        machine={selectedMachine}
      />
    </div>
  );
};

export default Summary;
