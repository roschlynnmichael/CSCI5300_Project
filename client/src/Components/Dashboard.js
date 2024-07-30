// import React, { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../context/AuthContext";
// import "./CSS/Dashboard.css";
// import Header from "./Header";
// import Footer from "./Footer";
// import CalendarComponent from "./Calendar";
// import { UserContext } from "../context/UserContext";
// import axios from "axios";
// import home from '../images/home.png';
// import savings from '../images/savings.png';
// import income from '../images/income.png';
// import budget from '../images/budget.png';
// import chart from '../images/chart.png';
// import { useNavigate } from 'react-router-dom';



// const Dashboard = () => {
//   const { user } = useContext(AuthContext);
//   const { state, dispatch } = useContext(UserContext);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [showOptionForm, setShowOptionForm] = useState(false);
//   const [showIncomeForm, setShowIncomeForm] = useState(false);
//   const [showExpenseForm, setShowExpenseForm] = useState(false);
//   const [amount, setAmount] = useState(0);

//   useEffect(() => {
//     console.log("Dashboard rendered with state: ", state);
//   }, [state]);

//   const handleDateClick = (date) => {
//     setSelectedDate(date);
//     setShowOptionForm(true);
//   };

//   const handleOptionSelect = (option) => {
//     setShowOptionForm(false);
//     if (option === "income") {
//       setShowIncomeForm(true);
//     } else if (option === "expense") {
//       setShowExpenseForm(true);
//     }
//   };

//   const handleAddIncome = () => {
//     const data = {
//       userId: user.id,
//       date: selectedDate,
//       amount: parseFloat(amount),
//     };
//     console.log("Adding Income:", data);
//     axios
//       .post("http://localhost:5001/api/budget/income", data)
//       .then((response) => {
//         console.log("In Dashboard JS, Income added:", amount);
//         dispatch({
//           type: "ADD_INCOME",
//           payload: { date: selectedDate, amount: parseFloat(amount) },
//         });
//       })
//       .catch((error) => {
//         console.error("Error adding income:", error);
//       });
//     setShowIncomeForm(false);
//     setAmount(0);
//   };

//   const handleAddExpense = () => {
//     const data = {
//       userId: user.id,
//       date: selectedDate,
//       amount: parseFloat(amount),
//     };
//     console.log("Adding Expense:", data);
//     axios
//       .post("http://localhost:5001/api/budget/expense", data)
//       .then((response) => {
//         console.log("Expense added:", response.data);
//         dispatch({
//           type: "ADD_EXPENSE",
//           payload: { date: selectedDate, amount: parseFloat(amount) },
//         });
//       })
//       .catch((error) => {
//         console.error("Error adding expense:", error);
//       });
//     setShowExpenseForm(false);
//     setAmount(0);
//   };

//   const calculateMonthlyTotals = (transactions) => {
//     const currentMonth = new Date().getMonth();
//     const currentYear = new Date().getFullYear();

//     return transactions.reduce((total, transaction) => {
//       const transactionDate = new Date(transaction.date);
//       if (
//         transactionDate.getMonth() === currentMonth &&
//         transactionDate.getFullYear() === currentYear
//       ) {
//         return total + transaction.amount;
//       }
//       return total;
//     }, 0);
//   };

//   const totalIncome = calculateMonthlyTotals(state.income);
//   const totalExpenses = calculateMonthlyTotals(state.expenses);

//   const calculateForecast = () => {
//     const today = new Date();
//     const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
//     const daysPassed = today.getDate();

//     const dailyIncome = totalIncome / daysPassed;
//     const dailyExpenses = totalExpenses / daysPassed;

//     const projectedIncome = dailyIncome * daysInMonth;
//     const projectedExpenses = dailyExpenses * daysInMonth;

//     const forecast = projectedIncome - projectedExpenses;
//     return { projectedIncome, projectedExpenses, forecast };
//   };

//   const { projectedIncome, projectedExpenses, forecast } = calculateForecast();

//   const formatDate = (date) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(date).toLocaleDateString(undefined, options);
//   };

//   const navigate = useNavigate();

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   if (!user) return <div>Please login to view your dashboard</div>;

//   return (
//     <div className="dashboard">
//       <Header />
//       <main>
//       <div className="navbar">
//       <button className="navbar-button" onClick={() => handleNavigation('/income')}>
//         <img src={income} alt="Income" />
//         <span>Income</span>
//       </button>
//       <button className="navbar-button" onClick={() => handleNavigation('/SavingsGoal')}>
//         <img src={savings} alt="Savings" />
//         <span>Savings</span>
//       </button>
//       <button className="navbar-button" onClick={() => handleNavigation('/dashboard')}>
//         <img src={home} alt="Home" />
//         <span>Home</span>
//       </button>
//       <button className="navbar-button" onClick={() => handleNavigation('/chart')}>
//         <img src={chart} alt="Chart" />
//         <span>Chart</span>
//       </button>
//       <button className="navbar-button" onClick={() => handleNavigation('/budget')}>
//         <img src={budget} alt="Budget" />
//         <span>Budget</span>
//       </button>
//     </div>
//         {/* <h1>Welcome user, {state.user.username}</h1> */}
//         {/* <p>User: {state.user ? state.user.username : 'Not logged in'}</p> */}
//         <p>Income: {state.income.length}</p>
//         <p>Expenses: {state.expenses.length}</p>
//         <p>Savings Goals: {state.savingsGoals.length}</p>

//         <div className="totals">
//           <div className="total-income">
//             <h2>Total Income for this month</h2>
//             <p>${totalIncome.toFixed(2)}</p>
//           </div>
//           <div className="total-expenses">
//             <h2>Total Expenses for this month</h2>
//             <p>${totalExpenses.toFixed(2)}</p>
//           </div>
//         </div>

//         <div className="forecast">
//           <h2>Monthly Budget Forecast</h2>
//           <p>Projected Income: ${projectedIncome.toFixed(2)}</p>
//           <p>Projected Expenses: ${projectedExpenses.toFixed(2)}</p>
//           <p>
//             {forecast >= 0
//               ? `Projected Savings: $${forecast.toFixed(2)}`
//               : `Projected Deficit: $${Math.abs(forecast).toFixed(2)}`}
//           </p>
//         </div>

//         <CalendarComponent onDateClick={handleDateClick} />

//         <div className="monthly-transactions">
//           <h2>Monthly Transactions</h2>
//           <div className="monthly-income">
//             <h3>Income</h3>
//             <ul>
//               {state.income
//                 .filter((income) => {
//                   const date = new Date(income.date);
//                   return (
//                     date.getMonth() === new Date().getMonth() &&
//                     date.getFullYear() === new Date().getFullYear()
//                   );
//                 })
//                 .map((income, index) => (
//                   <li key={index}>
//                     Date: {formatDate(income.date)}, Amount: ${income.amount.toFixed(2)}
//                   </li>
//                 ))}
//             </ul>
//           </div>
//           <div className="monthly-expenses">
//             <h3>Expenses</h3>
//             <ul>
//               {state.expenses
//                 .filter((expense) => {
//                   const date = new Date(expense.date);
//                   return (
//                     date.getMonth() === new Date().getMonth() &&
//                     date.getFullYear() === new Date().getFullYear()
//                   );
//                 })
//                 .map((expense, index) => (
//                   <li key={index}>
//                     Date: {formatDate(expense.date)}, Amount: ${expense.amount.toFixed(2)}
//                   </li>
//                 ))}
//             </ul>
//           </div>
//         </div>

//         {showOptionForm && (
//           <div className="modal">
//             <h2>Select an option</h2>
//             <button
//               className="income"
//               onClick={() => handleOptionSelect("income")}
//             >
//               Add Income
//             </button>
//             <button
//               className="expense"
//               onClick={() => handleOptionSelect("expense")}
//             >
//               Add Expense
//             </button>
//             <button onClick={() => setShowOptionForm(false)}>Cancel</button>
//           </div>
//         )}

//         {showIncomeForm && (
//           <div className="modal">
//             <h2>Add Income</h2>
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               placeholder="Amount"
//             />
//             <button onClick={handleAddIncome}>Add Income</button>
//             <button onClick={() => setShowIncomeForm(false)}>Cancel</button>
//           </div>
//         )}

//         {showExpenseForm && (
//           <div className="modal">
//             <h2>Add Expense</h2>
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               placeholder="Amount"
//             />
//             <button onClick={handleAddExpense}>Add Expense</button>
//             <button onClick={() => setShowExpenseForm(false)}>Cancel</button>
//           </div>
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Dashboard;
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./CSS/Dashboard.css";
// import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";

import { Routes, Route, Link } from "react-router-dom";
import Income from "./Pages/income";
import Budget from "./Pages/Budget";
import SavingsGoal from "./Pages/SavingsGoal";
import Chart from "./Pages/Chart";


//importing the images

import savings from '../images/savings.png';
import income from '../images/income.png';
import budget from '../images/budget.png';
import chart from '../images/chart.png';
import home from '../images/home.png';

import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (!user) return <div>Please login to view your dashboard</div>;

  return (
 <div className="dashboard">
   <header className="header">
      <h1>Budget Application</h1>
  {/* <Header /> */}
      <div className="navbar">
          <button className="navbar-button" onClick={() => handleNavigation('/dashboard/income')}>
            <img src={income} alt="Income" />
            <span>Income</span>
          </button>
          <button className="navbar-button" onClick={() => handleNavigation('/dashboard/SavingsGoal')}>
            <img src={savings} alt="Savings" />
            <span>Savings</span>
          </button>
          <button className="navbar-button" onClick={() => handleNavigation('/dashboard/home')}>
            <img src={home} alt="Home" />
            <span>Home</span>
          </button>
          <button className="navbar-button" onClick={() => handleNavigation('/dashboard/chart')}>
            <img src={chart} alt="Chart" />
            <span>Chart</span>
          </button>
          <button className="navbar-button" onClick={() => handleNavigation('/dashboard/budget')}>
            <img src={budget} alt="Budget" />
            <span>Budget</span>
          </button>
        </div>
        </header>

      <main>
      <Routes>
          <Route path="home" element={<Home user={user} />} />
          <Route path="income" element={<Income user={user} />} />
          <Route path="budget" element={<Budget/>} />
          <Route path="savingsgoal" element={<SavingsGoal />} />
          <Route path="chart" element={<Chart />} />
        </Routes>
        {/* <Home user={user} /> */}

      </main>
      
      <Footer />
    </div>
   
  );
};

export default Dashboard;
