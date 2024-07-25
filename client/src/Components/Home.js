import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import CalendarComponent from "./Calendar";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  const { state, dispatch } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showOptionForm, setShowOptionForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("monthly");

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
      description: description,
      frequency: frequency,
    };
    axios
      .post("http://localhost:5001/api/budget/income", data)
      .then(() => {
        dispatch({
          type: "ADD_INCOME",
          payload: { date: selectedDate, amount: parseFloat(amount), description: description, frequency: frequency },
        });
      })
      .catch((error) => {
        console.error("Error adding income:", error);
      });
    setShowIncomeForm(false);
    setAmount(0);
    setDescription("");
    setFrequency("monthly");
  };

  const handleAddExpense = () => {
    const data = {
      userId: user.id,
      date: selectedDate,
      amount: parseFloat(amount),
      description: description,
      frequency: frequency,
    };
    axios
      .post("http://localhost:5001/api/budget/expense", data)
      .then(() => {
        dispatch({
          type: "ADD_EXPENSE",
          payload: { date: selectedDate, amount: parseFloat(amount), description: description, frequency: frequency },
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

  const calculateForecast = () => {
    const today = new Date();
    const daysInMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();
    const daysPassed = today.getDate();

    const dailyIncome = totalIncome / daysPassed;
    const dailyExpenses = totalExpenses / daysPassed;

    const projectedIncome = dailyIncome * daysInMonth;
    const projectedExpenses = dailyExpenses * daysInMonth;

    const forecast = projectedIncome - projectedExpenses;
    return { projectedIncome, projectedExpenses, forecast };
  };

  const { projectedIncome, projectedExpenses, forecast } = calculateForecast();

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="home">
      <CalendarComponent onDateClick={handleDateClick} />

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

      <div className="forecast">
        <h2>Monthly Budget Forecast</h2>
        <p>Projected Income: ${projectedIncome.toFixed(2)}</p>
        <p>Projected Expenses: ${projectedExpenses.toFixed(2)}</p>
        <p>
          {forecast >= 0
            ? `Projected Savings: $${forecast.toFixed(2)}`
            : `Projected Deficit: $${Math.abs(forecast).toFixed(2)}`}
        </p>
      </div>

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
                  Date: {formatDate(income.date)}<br />
                  Amount: ${income.amount.toFixed(2)}<br/>  
                  Description:{income.description}<br/>
                  frequency: {income.frequency}<br/>
                  <li style={{listStyleType: "none"}}>-------------------------------------------------</li>
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
                  Date: {formatDate(expense.date)}, Amount: $
                  {expense.amount.toFixed(2)}
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
          <input
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Description" 
          />
          <input 
            type="text" 
            value={frequency} 
            onChange={(e) => setFrequency(e.target.value)} 
            placeholder="frequency" 
          />
          <button className="income" onClick={handleAddIncome}>Add Income</button>
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
          <input
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Description" 
          />
          <input 
            type="text" 
            value={frequency} 
            onChange={(e) => setFrequency(e.target.value)} 
            placeholder="frequency" 
          />
          <button className="expense" onClick={handleAddExpense}>Add Expense</button>
          <button onClick={() => setShowExpenseForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Home;
