import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./CSS/Dashboard.css";

import Header from "./Header";
import Footer from "./Footer";
import CalendarComponent from "./Calendar";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { state, dispatch } = useContext(UserContext);

  const [selectedDate, setSelectedDate] = useState(null);
  const [showOptionForm, setShowOptionForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [amount, setAmount] = useState(0);


  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowOptionForm(true);
  };

  const handleOptionSelect = (option) => {
    setShowOptionForm(false);
    if (option === "income") {
      setShowIncomeForm(true);
    } else if (option === "expense") {
      setShowExpenseForm(true);
    }
  };

  const handleAddIncome = () => {
    dispatch({
      type: "ADD_INCOME",
      payload: { date: selectedDate, amount },
    });
    setShowIncomeForm(false);
    setAmount(0);
  };

  const handleAddExpense = () => {
    dispatch({
      type: "ADD_EXPENSE",
      payload: { date: selectedDate, amount },
    });
    setShowExpenseForm(false);
    setAmount(0);
  };
  if (!user) return <div>Please login to view your dashboard</div>;

  const todaysIncome = state.expenses.filter(expense => expense.date === selectedDate && expense.amount > 0);
  const todaysExpenses = state.expenses.filter(expense => expense.date === selectedDate && expense.amount < 0);

  return (
    <div className="dashboard">
      <Header />
      <main>
        <h1>Welcome, {user.username}</h1>
        <CalendarComponent onDateClick={handleDateClick} />

        {showOptionForm && (
          <div className="modal">
            <h2>Select an option</h2>
            <button className="income" onClick={() => handleOptionSelect("income")}>Add Income</button>
            <button className="expense" onClick={() => handleOptionSelect("expense")}>Add Expense</button>
            <button onClick={() => setShowOptionForm(false)}>Cancel</button>
          </div>
        )}

        {showIncomeForm && (
          <div className="modal">
            <h2>Add Income</h2>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
            <button onClick={handleAddIncome}>Add Income</button>
            <button onClick={() => setShowIncomeForm(false)}>Cancel</button>
          </div>
        )}

        {showExpenseForm && (
          <div className="modal">
            <h2>Add Expense</h2>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
            <button onClick={handleAddExpense}>Add Expense</button>
            <button onClick={() => setShowExpenseForm(false)}>Cancel</button>
          </div>
        )}
        <div className="todays-transactions">
          <h2>Today's Transactions</h2>
          <div className="transaction">
            <h3>Income</h3>
            <ul>
              {todaysIncome.map((income, index) => (
                <li key={index}>Date: {income.date}, Amount: {income.amount}</li>
              ))}
            </ul>
          </div>
          <div className="transaction">
            <h3>Expenses</h3>
            <ul>
              {todaysExpenses.map((expense, index) => (
                <li key={index}>Date: {expense.date}, Amount: {expense.amount}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
