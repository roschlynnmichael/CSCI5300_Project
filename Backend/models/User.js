const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    income: { type: String, required: true },  // Store as JSON string
    expenses: { type: String, required: true },  // Store as JSON string
    savingsGoals: { type: String, required: true }  // Store as JSON string
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
