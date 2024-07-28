import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext'; // Adjusted the import path

function Income({ user }) {
  const { state } = useContext(UserContext);

  const calculateMonthlyTotals = (transactions) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return transactions.reduce((total, transaction) => {
      const transactionDate = new Date(transaction.date);
      if (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      ) {

        if(transaction.frequency === 'bi-weekly'){

          const amountToAdd = transaction.amount * 2;
          total = total + amountToAdd;
        } 
        else if(transaction.frequency === 'weekly'){

          const amountToAdd = transaction.amount * 4;
          total = total + amountToAdd;
        }
        else{

          total = total + transaction.amount;
        }

        return total 
      }
      return total;
    }, 0);
  };

  const totalIncome = calculateMonthlyTotals(state.income);
  const totalExpenses = calculateMonthlyTotals(state.expenses);

  return (
    <div>
      <h1>This is Income page</h1>
      <div className="totals">
        <div className="total-income">
          <h2>Total Income for this month</h2>
          <p>${totalIncome ? totalIncome.toFixed(2) : '0.00'}</p>
        </div>
        <div className="total-expenses">
          <h2>Total Expenses for this month</h2>
          <p>${totalExpenses ? totalExpenses.toFixed(2) : '0.00'}</p>
        </div>
      </div>
    </div>
  );
}

export default Income;
