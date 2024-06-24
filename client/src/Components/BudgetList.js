


import React, { useEffect, useState } from 'react';

const BudgetList = ({ userId }) => {
    const [budget, setBudget] = useState(null);

    
    useEffect(() => {
        console.log('Fetching budget for userId:', userId);
        fetch(`http://localhost:5001/api/budget/${userId}`)
            .then(response => response.json())
            .then(data => setBudget(data))
            .catch(error => console.error('Error fetching budget:', error));
    }, [userId]);

    if (!budget) {
        return <div>No budget found.</div>;
    }

    return (
        <div>
            <h2>Income</h2>
            {budget.income.map((incomeEntry, index) => (
                <div key={index}>
                    <p>Amount: {incomeEntry.amount}</p>
                    <p>Frequency: {incomeEntry.frequency}</p>
                </div>
            ))}

            <h2>Expenses</h2>
            {budget.expenses.map((expenseEntry, index) => (
                <div key={index}>
                    <p>Name: {expenseEntry.name}</p>
                    <p>Amount: {expenseEntry.amount}</p>
                    <p>Frequency: {expenseEntry.frequency}</p>
                </div>
            ))}
        </div>
    );
};

export default BudgetList;
