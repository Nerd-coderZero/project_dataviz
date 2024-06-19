import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Insight Visualization Dashboard</h1>
        </div>
      </header>
      <main className="app-main">
        <div className="dashboard-container">
          <Dashboard />
        </div>
      </main>
      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; 2023 Kushagra Jaiswal - Data Visualization Assignment</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
