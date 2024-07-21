import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './BarChartComponent.css'; // Ensure to import the CSS file

const BarChartComponent = () => {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState('03'); // Default to March

  useEffect(() => {
    fetchBarChartData();
  }, [month]);

  const fetchBarChartData = async () => {
    const response = await axios.get('http://localhost:8000/api/barchart', {
      params: { month }
    });
    setData(response.data);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="bar-chart-dashboard">
      <div className="bar-chart-header">
        Bar Chart Stats - {new Date(0, month - 1).toLocaleString('en', { month: 'long' })}
      </div>
      <div className="bar-chart-controls">
        <label htmlFor="month">Select Month: </label>
        <select id="month" value={month} onChange={handleMonthChange}>
          {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((m) => (
            <option key={m} value={m}>{new Date(0, m - 1).toLocaleString('en', { month: 'long' })}</option>
          ))}
        </select>
      </div>
      <div className="bar-chart-container">
        <BarChart width={600} height={300} data={data} className="bar-chart">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#4a90e2" />
        </BarChart>
      </div>
    </div>
  );
};

export default BarChartComponent;
