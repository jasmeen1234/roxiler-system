import React from 'react';
import TransactionsTable from './TransactionsTable';
import BarChartComponent from './BarChartComponent';
import PieChartComponent from './PieChartComponent';

const Dashboard = () => {
  return (
    <div>
      
      <div>
        <TransactionsTable />
      </div>
      <div>
        <BarChartComponent />
      </div>
      <div>
        <PieChartComponent />
      </div>
    </div>
  );
};

export default Dashboard;
