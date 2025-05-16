import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const MachineTrendChart = ({ machineId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate trend data
    const generateData = () => {
      const points = [];
      for (let i = 0; i < 10; i++) {
        points.push({
          time: `${30 - i * 3} min ago`,
          temperature: 70 + Math.random() * 15,
          vibration: 40 + Math.random() * 10
        });
      }
      return points.reverse();
    };

    setData(generateData());
  }, [machineId]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid stroke="#334" />
        <XAxis dataKey="time" stroke="#aaa" />
        <YAxis stroke="#aaa" />
        <Tooltip contentStyle={{ backgroundColor: '#1B263B', color: '#fff', borderRadius: '8px' }} />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="#7EC8E3" strokeWidth={2} />
        <Line type="monotone" dataKey="vibration" stroke="#FF8C00" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MachineTrendChart;
