import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const SavingsGoal = () => {
  const { state, dispatch } = useContext(UserContext);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [goalAmount, setGoalAmount] = useState(0);
  const [goalName, setGoalName] = useState("");
  const [allocatedPercentage, setAllocatedPercentage] = useState(0);

  // Log the user object and savings goals to verify them
  useEffect(() => {
    console.log("User object:", state.user);
    console.log("Savings Goals:", state.savingsGoals);
  }, [state.user, state.savingsGoals]);

  const handleAddGoal = () => {
    if (!state.user || !state.user.id) {
      console.error("User object or user.id is undefined");
      return;
    }

    const data = {
      userId: state.user.id,
      goalName: goalName,
      goalAmount: parseFloat(goalAmount),
      allocatedPercentage: parseFloat(allocatedPercentage),
    };

    axios
      .post("http://localhost:5001/api/budget/saving", data)
      .then((response) => {
        dispatch({
          type: "ADD_GOAL",
          payload: {goalName: goalName, goalAmount: parseFloat(goalAmount), allocatedPercentage: parseFloat(allocatedPercentage)},
        });
      })
      .catch((error) => {
        console.error("Error adding goal:", error);
      });

    setGoalAmount(0);
    setGoalName("");
    setAllocatedPercentage(0);
    setShowGoalForm(false);
  };

  return (
    <div>
      <h1>Savings Goals:</h1>
      <button onClick={() => setShowGoalForm(true)}>Add a Savings Goal</button>
      <ul>
        {state.savingsGoals.map((goal, index) => (
          <li key={index}>
            Goal Name: {goal.goalName}<br />
            Goal Amount: ${goal.goalAmount ? goal.goalAmount.toFixed(2) : '0.00'}<br />
            Allocated Percentage: {goal.allocatedPercentage ? goal.allocatedPercentage.toFixed(2) : '0.00'}%<br />
            <li style={{ listStyleType: "none" }}>-------------------------------------------------</li>
          </li>
        ))}
      </ul>
      {showGoalForm && (
        <div className="modal">
          <h2>Add Savings Goal</h2>
          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder="Enter Goal"
          />
          <input
            type="number"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            placeholder="Enter Target Amount"
          />
          <input
            type="number"
            value={allocatedPercentage}
            onChange={(e) => setAllocatedPercentage(e.target.value)}
            placeholder="Allocated Percentage"
          />
          <button className="goal" onClick={handleAddGoal}>Add Savings Goal</button>
          <button onClick={() => setShowGoalForm(false)}>Cancel</button>
        </div>
      )}

    
    </div>
  );
};

export default SavingsGoal;
