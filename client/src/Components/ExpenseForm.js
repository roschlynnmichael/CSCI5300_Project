import React, { useState } from 'react';

const ExpenseForm = ({ date, onSave }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(date, amount);
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Expense for {date.toDateString()}</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default ExpenseForm;
