// const mongoose = require('mongoose');

// const budgetSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     income: [{ amount: Number, frequency: String }],
//     expenses: [{ amount: Number, frequency: String }],
// });

// module.exports = mongoose.model('Budget', budgetSchema);

// Budget.js
const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    income: {
        type: Number,
        required: true
    },
    expenses: [{
        name: String,
        amount: Number
    }]
});

module.exports = mongoose.model('Budget', budgetSchema);
