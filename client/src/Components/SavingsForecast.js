// import React from 'react';

// const SavingsForecast = ({ savingsGoal, disposableIncome }) => {
//     const monthsToAchieveGoal = savingsGoal.goalAmount / ((disposableIncome * (savingsGoal.allocatedPercentage / 100)));

//     return (
//         <div>
//             {/* Display forecasted time to achieve savings goal */}
//             <p>Months to achieve goal: {monthsToAchieveGoal}</p>
//         </div>
//     );
// };

// export default SavingsForecast;


import React from 'react';

const SavingsForecast = ({ savingsGoal, disposableIncome }) => {
    const { goalAmount, allocatedPercentage } = savingsGoal;
    
    if (disposableIncome <= 0 || allocatedPercentage <= 0) {
        return <p>Invalid disposable income or allocated percentage.</p>;
    }

    const monthsToAchieveGoal = goalAmount / ((disposableIncome * (allocatedPercentage / 100)));

    return (
        <div>
            <p>
                Months to achieve goal: {Math.ceil(monthsToAchieveGoal)}
            </p>
        </div>
    );
};

export default SavingsForecast;
