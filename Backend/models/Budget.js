const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    income: [
        {
            date: { type: Date, required: true },
            amount: { type: Number, required: true },
            descrption: { type: String, required: true },
            frequency: { type: String, required: true }
        }
    ],
    expenses: [
        {
            date: { type: Date, required: true },
            amount: { type: Number, required: true },
            descrption: { type: String, required: true },
            frequency: { type: String, required: true }        }
    ]
});

const Budget = mongoose.model('Budget', BudgetSchema);

module.exports = Budget;
