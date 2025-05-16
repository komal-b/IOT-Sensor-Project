// App.js
import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DashboardCards from './components/DashboardCards';
import Summary from './components/Summary';
import TopMachineChart from './components/TopMachineChart';
import AlertTimeline from './components/AlertTimeline';



function App() {
  return (
    <div className="App">
      <h1>IoT Sensor Analytics Dashboard</h1>

      {/* Toast container (global) */}
      <ToastContainer position="bottom-right" autoClose={5000} />

      <div className="section-container">
        <div className="card">
          <h2 className="card-title">📊 Dashboard Metrics</h2>
          <DashboardCards />
        </div>
        <div className="card chart-container">
          <TopMachineChart />
        </div>
        <div className="card">
          <AlertTimeline />
        </div>
        <div className="card">
          <Summary />
        </div>
       
      </div>
    </div>
  );
}

export default App;
