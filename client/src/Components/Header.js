import React from 'react';
import './CSS/Header.css';

import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <header className="header">
      <h1>Budget Application</h1>
      {/* <div className="navbar">
          <button className="navbar-button" onClick={() => handleNavigation('/income')}>
            <img src={income} alt="Income" />
            <span>Income</span>
          </button>
          <button className="navbar-button" onClick={() => handleNavigation('/SavingsGoal')}>
            <img src={savings} alt="Savings" />
            <span>Savings</span>
          </button>
          <button className="navbar-button" onClick={() => handleNavigation('/dashboard')}>
            <img src={home} alt="Home" />
            <span>Home</span>
          </button>
          <button className="navbar-button" onClick={() => handleNavigation('/chart')}>
            <img src={chart} alt="Chart" />
            <span>Chart</span>
          </button>
          <button className="navbar-button" onClick={() => handleNavigation('/budget')}>
            <img src={budget} alt="Budget" />
            <span>Budget</span>
          </button>
        </div> */}
    </header>
  );
};

export default Header;

