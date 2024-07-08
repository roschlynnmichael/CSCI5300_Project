const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
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
    ],
    savingsGoals: [
        {
            goalName: { type: String, required: true },
            goalAmount: { type: Number, required: true },
            allocatedPercentage: { type: Number, required: true }
        }
    ]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
