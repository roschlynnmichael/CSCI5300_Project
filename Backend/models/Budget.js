const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    income: [
        {
            date: { type: Date, required: true },
            amount: { type: Number, required: true }
        }
    ],
    expenses: [
        {
            date: { type: Date, required: true },
            amount: { type: Number, required: true }
        }
    ]
});

const Budget = mongoose.model('Budget', BudgetSchema);

module.exports = Budget;
