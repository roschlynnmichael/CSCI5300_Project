// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    income: { type: Number, default: 0 },
    expenses: { type: Array, default: [] },
    savingsGoals: { type: Array, default: [] }
});

module.exports = mongoose.model('User', UserSchema);
