

import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import BudgetList from "./BudgetList";
import SavingsGoalList from "./SavingsGoalList";
import BudgetForm from "./BudgetForm";
import SavingsGoalForm from "./SavingsGoalForm";
import './CSS/Dashboard.css';


const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [showSavingsForm, setShowSavingsForm] = useState(false);

  if (!user) return <div>Please login to view your dashboard</div>;
  console.log("User in Dashboard:", user);  // Debug log

  return (
    <div className="dashboard">
            <h1>Welcome, {user.username}</h1>
            <div className="dashboard-section">
                <h2>Budget</h2>
                <button onClick={() => setShowBudgetForm(!showBudgetForm)}>
                    {showBudgetForm ? 'Hide' : 'Add Budget'}
                </button>
                {showBudgetForm && <BudgetForm onSave={() => setShowBudgetForm(false)} />}
                <BudgetList userId={user.id} />
            </div>
            <div className="dashboard-section">
                <h2>Savings Goals</h2>
                <button onClick={() => setShowSavingsForm(!showSavingsForm)}>
                    {showSavingsForm ? 'Hide' : 'Add Savings Goal'}
                </button>
                {showSavingsForm && <SavingsGoalForm onSave={() => setShowSavingsForm(false)} />}
                <SavingsGoalList userId={user.id} />
            </div>
        </div>
  );
};

export default Dashboard;
