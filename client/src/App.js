// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import BudgetForm from './Components/BudgetForm';
import SavingsGoalForm from './Components/SavingsGoalForm';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/budget" element={<BudgetForm/>} />
                <Route path="/savings" element={<SavingsGoalForm/>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
