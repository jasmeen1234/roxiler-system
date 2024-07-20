import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart, BarController, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './barchart.css'
Chart.register(BarController, CategoryScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [selectedMonth, setSelectedMonth] = useState("June"); // Initial month
  const [chartData, setChartData] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.example.com/transactions?month=${selectedMonth}`);
        setChartData(response.data.transactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedMonth]); // Refetch data when selectedMonth changes

  // Chart.js data structure
  const chartOptions = {
    responsive: true, // Make the chart responsive
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  if (!chartData) {
    return <div>Loading chart...</div>; // Show loading indicator
  }

  const chartLabels = chartData.map(data => data.priceRange);
  const chartDataValues = chartData.map(data => data.itemCount);

  return (
    <div>
      <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>
      <Bar
        data={{
          labels: chartLabels,
          datasets: [
            {
              label: 'Items',
              data: chartDataValues,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }
          ]
        }}
        options={chartOptions}
      />
    </div>
  );
};

export default BarChart;