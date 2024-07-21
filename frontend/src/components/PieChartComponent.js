import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import './PieChartComponent.css'; // Ensure to import the CSS file

const PieChartComponent = () => {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState('03'); // Default to March

  useEffect(() => {
    fetchPieChartData();
  }, [month]);

  const fetchPieChartData = async () => {
    const response = await axios.get('http://localhost:8000/api/piechart', {
      params: { month }
    });
    setData(response.data);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="pie-chart-dashboard">
      <div className="pie-chart-header">
        Pie Chart Stats - {new Date(0, month - 1).toLocaleString('en', { month: 'long' })}
      </div>
      <div className="pie-chart-controls">
        <label htmlFor="month">Select Month: </label>
        <select id="month" value={month} onChange={handleMonthChange}>
          {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((m) => (
            <option key={m} value={m}>{new Date(0, m - 1).toLocaleString('en', { month: 'long' })}</option>
          ))}
        </select>
      </div>
      <div className="pie-chart-container">
        <PieChart width={400} height={400} className="pie-chart">
          <Pie
            data={data}
            dataKey="count"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default PieChartComponent;
