const express = require('express');
const User = require('../models/User'); // Make sure the path to the User model is correct
const router = express.Router();

router.post('/budget/income', async (req, res) => {
    const { userId, date, amount } = req.body;
    console.log('In BudgetRouting JS , Received data for adding income:', req.body); // Log the received data
    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        console.log('In Budjet Routes, User found:', user); // Log the user data
        if (!user.income) {
            user.income = []; // Initialize the income array if it doesn't exist
        }
        user.income.push({ date, amount });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.error('Error adding income:', error);
        res.status(500).send('Error adding income');
    }
});

router.post('/budget/expense', async (req, res) => {
    const { userId, date, amount } = req.body;
    console.log('In BudgetRouting JS , Received data for adding expense:', req.body); // Log the received data
    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        console.log('User found:', user); // Log the user data
        if (!user.expenses) {
            user.expenses = []; // Initialize the expenses array if it doesn't exist
        }
        user.expenses.push({ date, amount });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).send('Error adding expense');
    }
});

module.exports = router;
