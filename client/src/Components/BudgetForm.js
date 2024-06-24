// import React, { useState } from 'react';

// const BudgetForm = ({ onSave }) => {
//     const [income, setIncome] = useState([{ amount: '', frequency: 'monthly' }]);
//     const [expenses, setExpenses] = useState([{ amount: '', frequency: 'monthly' }]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // Call API to save budget data
//         const response = await fetch('http://localhost:5001/api/budget', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ income, expenses })
//         });
//         if (response.ok) {
//             onSave();
//         } else {
//             alert('Failed to save budget data');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             {/* Add form fields for income and expenses */}
//             <button type="submit">Save Budget</button>
//         </form>
//     );
// };

// export default BudgetForm;


import React, { useState } from 'react';

const BudgetForm = ({ onSave }) => {
    const [income, setIncome] = useState([{ amount: '', frequency: 'monthly' }]);
    const [expenses, setExpenses] = useState([{ name: '', amount: '', frequency: 'monthly' }]);

    const handleIncomeChange = (index, field, value) => {
        const newIncome = [...income];
        newIncome[index][field] = value;
        setIncome(newIncome);
    };

    const handleExpenseChange = (index, field, value) => {
        const newExpenses = [...expenses];
        newExpenses[index][field] = value;
        setExpenses(newExpenses);
    };

    const addIncome = () => {
        setIncome([...income, { amount: '', frequency: 'monthly' }]);
    };

    const addExpense = () => {
        setExpenses([...expenses, { name: '', amount: '', frequency: 'monthly' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5001/api/budget', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ income, expenses })
        });
        if (response.ok) {
            onSave();
        } else {
            alert('Failed to save budget data');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Income</h3>
            {income.map((entry, index) => (
                <div key={index}>
                    <input
                        type="number"
                        placeholder="Amount"
                        value={entry.amount}
                        onChange={(e) => handleIncomeChange(index, 'amount', e.target.value)}
                        required
                    />
                    <select
                        value={entry.frequency}
                        onChange={(e) => handleIncomeChange(index, 'frequency', e.target.value)}
                    >
                        <option value="monthly">Monthly</option>
                        <option value="weekly">Weekly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
            ))}
            <button type="button" onClick={addIncome}>Add Income</button>

            <h3>Expenses</h3>
            {expenses.map((entry, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Expense Name"
                        value={entry.name}
                        onChange={(e) => handleExpenseChange(index, 'name', e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={entry.amount}
                        onChange={(e) => handleExpenseChange(index, 'amount', e.target.value)}
                        required
                    />
                    <select
                        value={entry.frequency}
                        onChange={(e) => handleExpenseChange(index, 'frequency', e.target.value)}
                    >
                        <option value="monthly">Monthly</option>
                        <option value="weekly">Weekly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
            ))}
            <button type="button" onClick={addExpense}>Add Expense</button>

            <button type="submit">Save Budget</button>
        </form>
    );
};

export default BudgetForm;
