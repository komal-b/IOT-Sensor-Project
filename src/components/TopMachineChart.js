// src/components/TopMachineChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const TopMachineChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/top-machines')
      .then(response => {
        console.log('✅ Top Machines Chart Data:', response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('❌ Error fetching top machines:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <div>
      <h2 className="card-title">🏭 Top Machines by Logs</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="85%">
          <LineChart
            data={data.slice(0, 7)} // Top 7 machines
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334" />
            <XAxis dataKey="machine_id" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1B263B',
                borderRadius: '8px',
                border: 'none',
                color: '#fff'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="total_logs"
              stroke="#7EC8E3"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopMachineChart;
