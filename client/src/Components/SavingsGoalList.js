
import React, { useEffect, useState } from 'react';

const SavingsGoalList = ({ userId }) => {
    const [savingsGoals, setSavingsGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


   
    useEffect(() => {
        console.log('Fetching savings goal list for userId:', userId);
        fetch(`http://localhost:5001/api/savings/${userId}`)
            .then(response => response.json())
            .then(data => setSavingsGoals(data))
            .catch(error => console.error('Error fetching savings goals:', error));
    }, [userId]);

    if (savingsGoals.length === 0) {
        return <div>No savings goals found.</div>;
    }

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    return (
        <div>
            <h2>Savings Goals</h2>
            <ul>
                {savingsGoals.map((goal) => (
                    <li key={goal._id}>
                        <h3>{goal.goalName}</h3>
                        <p>Goal Amount: ${goal.goalAmount}</p>
                        <p>Allocated Percentage: {goal.allocatedPercentage}%</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SavingsGoalList;
