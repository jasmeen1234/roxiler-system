import logo from './logo.svg';
import './App.css';
import UsePagination from './Pagination';
import TransactionTable from './TransactionTable';
import BarChart from './BarChart';

function App() {
  return (
    <div className="App">
      <UsePagination/>
      <TransactionTable/>
      <BarChart/>
    </div>
  );
}

export default App;
