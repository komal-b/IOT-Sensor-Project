import React from 'react';
import Modal from 'react-modal';
import MachineTrendChart from './MachineTrendChart';
Modal.setAppElement('#root');

const MachineTrendModal = ({ isOpen, onRequestClose, machine }) => {
  if (!machine) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="machine-modal"
      overlayClassName="machine-modal-overlay"
    >
      <div className="modal-header">
        <h2>Machine {machine.machine_id} - Trend</h2>
        <button className="close-button" onClick={onRequestClose}>✖</button>
      </div>

      <div className="modal-content">
        <div className="modal-info">
          <p><strong>Temp:</strong> {machine.avg_temp_C?.toFixed(1)} °C</p>
          <p><strong>Pressure:</strong> {machine.avg_pressure_psi?.toFixed(1)} psi</p>
          <p><strong>Vibration:</strong> {machine.avg_vibration_Hz?.toFixed(1)} Hz</p>
        </div>
        <div className="modal-chart">
          <MachineTrendChart machineId={machine.machine_id} />
        </div>
      </div>
    </Modal>
  );
};

export default MachineTrendModal;
