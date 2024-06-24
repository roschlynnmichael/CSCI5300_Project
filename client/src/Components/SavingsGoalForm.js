// import React, { useState } from 'react';

// const SavingsGoalForm = ({ onSave }) => {
//     const [goalName, setGoalName] = useState('');
//     const [goalAmount, setGoalAmount] = useState('');
//     const [allocatedPercentage, setAllocatedPercentage] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // Call API to save savings goal
//         const response = await fetch('http://localhost:5001/api/savings', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ goalName, goalAmount, allocatedPercentage })
//         });
//         if (response.ok) {
//             onSave();
//         } else {
//             alert('Failed to save savings goal');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             {/* Add form fields for savings goals */}
//             <button type="submit">Save Goal</button>
//         </form>
//     );
// };

// export default SavingsGoalForm;


import React, { useState } from 'react';

const SavingsGoalForm = ({ onSave }) => {
    const [goalName, setGoalName] = useState('');
    const [goalAmount, setGoalAmount] = useState('');
    const [allocatedPercentage, setAllocatedPercentage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call API to save savings goal
        const response = await fetch('http://localhost:5001/api/savings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ goalName, goalAmount, allocatedPercentage })
        });
        if (response.ok) {
            onSave();
        } else {
            alert('Failed to save savings goal');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="goalName">Goal Name:</label>
                <input
                    type="text"
                    id="goalName"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="goalAmount">Goal Amount:</label>
                <input
                    type="number"
                    id="goalAmount"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="allocatedPercentage">Allocated Percentage:</label>
                <input
                    type="number"
                    id="allocatedPercentage"
                    value={allocatedPercentage}
                    onChange={(e) => setAllocatedPercentage(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Save Goal</button>
        </form>
    );
};

export default SavingsGoalForm;
