// import React from 'react';

// const BudgetForecast = ({ budget }) => {
//     // Calculate forecasted budget based on income and expenses

//     return (
//         <div>
//             {/* Display forecasted budget */}
//         </div>
//     );
// };

// export default BudgetForecast;


import React from 'react';

const BudgetForecast = ({ budget }) => {
    // Helper function to calculate total amount based on frequency
    const calculateTotalAmount = (items) => {
        return items.reduce((total, item) => {
            let annualAmount = item.amount;
            switch (item.frequency) {
                case 'weekly':
                    annualAmount *= 52;
                    break;
                case 'monthly':
                    annualAmount *= 12;
                    break;
                case 'yearly':
                    break;
                default:
                    break;
            }
            return total + annualAmount;
        }, 0);
    };

    // Calculate total income and expenses
    const totalIncome = calculateTotalAmount(budget.income);
    const totalExpenses = calculateTotalAmount(budget.expenses);

    // Calculate net income
    const netIncome = totalIncome - totalExpenses;

    return (
        <div>
            <h2>Budget Forecast</h2>
            <p>Total Income: ${totalIncome.toFixed(2)}</p>
            <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
            <p>Net Income: ${netIncome.toFixed(2)}</p>
        </div>
    );
};

export default BudgetForecast;
