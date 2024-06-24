// const mongoose = require('mongoose');

// const savingsGoalSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     goalName: { type: String, required: true },
//     goalAmount: { type: Number, required: true },
//     allocatedPercentage: { type: Number, required: true },
// });

// module.exports = mongoose.model('SavingsGoal', savingsGoalSchema);




// SavingsGoal.js
const mongoose = require('mongoose');

const savingsGoalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    goalName: {
        type: String,
        required: true
    },
    goalAmount: {
        type: Number,
        required: true
    },
    allocatedPercentage: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('SavingsGoal', savingsGoalSchema);
