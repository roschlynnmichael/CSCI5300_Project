import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import "./CSS/Dashboard.css";
import Header from "./Header";
import Footer from "./Footer";
import CalendarComponent from "./Calendar";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { state, dispatch } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showOptionForm, setShowOptionForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    console.log("Dashboard rendered with state: ", state);
  }, [state]);

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
    const data = {
      userId: user.id,
      date: selectedDate,
      amount: parseFloat(amount),
    };
    console.log("Adding Income:", data);
    axios
      .post("http://localhost:5001/api/budget/income", data)
      .then((response) => {
        console.log("In Dashboard JS, Income added:", amount);
        dispatch({
          type: "ADD_INCOME",
          payload: { date: selectedDate, amount: parseFloat(amount) },
        });
      })
      .catch((error) => {
        console.error("Error adding income:", error);
      });
    setShowIncomeForm(false);
    setAmount(0);
  };

  const handleAddExpense = () => {
    const data = {
      userId: user.id,
      date: selectedDate,
      amount: parseFloat(amount),
    };
    console.log("Adding Expense:", data);
    axios
      .post("http://localhost:5001/api/budget/expense", data)
      .then((response) => {
        console.log("Expense added:", response.data);
        dispatch({
          type: "ADD_EXPENSE",
          payload: { date: selectedDate, amount: parseFloat(amount) },
        });
      })
      .catch((error) => {
        console.error("Error adding expense:", error);
      });
    setShowExpenseForm(false);
    setAmount(0);
  };

  const calculateMonthlyTotals = (transactions) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return transactions.reduce((total, transaction) => {
      const transactionDate = new Date(transaction.date);
      if (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      ) {
        return total + transaction.amount;
      }
      return total;
    }, 0);
  };

  const totalIncome = calculateMonthlyTotals(state.income);
  const totalExpenses = calculateMonthlyTotals(state.expenses);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const savigsGoals=()=>{
    

  }

  if (!user) return <div>Please login to view your dashboard</div>;

  return (
    <div className="dashboard">
      <Header />
      <main>
        <h1>Welcome user, {state.user.username}</h1>
        {/* <p>User: {state.user ? state.user.username : 'Not logged in'}</p>
        <p>Income: {state.income.length}</p>
        <p>Expenses: {state.expenses.length}</p>
        <p>Savings Goals: {state.savingsGoals.length}</p> */}

        <div className="totals">
          <div className="total-income">
            <h2>Total Income for this month</h2>
            <p>${totalIncome.toFixed(2)}</p>
          </div>
          <div className="total-expenses">
            <h2>Total Expenses for this month</h2>
            <p>${totalExpenses.toFixed(2)}</p>
          </div>
        </div>

        <CalendarComponent onDateClick={handleDateClick} />

        <div className="monthly-transactions">
          <h2>Monthly Transactions</h2>
          <div className="monthly-income">
            <h3>Income</h3>
            <ul>
              {state.income
                .filter((income) => {
                  const date = new Date(income.date);
                  return (
                    date.getMonth() === new Date().getMonth() &&
                    date.getFullYear() === new Date().getFullYear()
                  );
                })
                .map((income, index) => (
                  <li key={index}>
                    Date: {formatDate(income.date)}, Amount: ${income.amount.toFixed(2)}
                  </li>
                ))}
            </ul>
          </div>
          <div className="monthly-expenses">
            <h3>Expenses</h3>
            <ul>
              {state.expenses
                .filter((expense) => {
                  const date = new Date(expense.date);
                  return (
                    date.getMonth() === new Date().getMonth() &&
                    date.getFullYear() === new Date().getFullYear()
                  );
                })
                .map((expense, index) => (
                  <li key={index}>
                    Date: {formatDate(expense.date)}, Amount: ${expense.amount.toFixed(2)}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {showOptionForm && (
          <div className="modal">
            <h2>Select an option</h2>
            <button
              className="income"
              onClick={() => handleOptionSelect("income")}
            >
              Add Income
            </button>
            <button
              className="expense"
              onClick={() => handleOptionSelect("expense")}
            >
              Add Expense
            </button>
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
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
