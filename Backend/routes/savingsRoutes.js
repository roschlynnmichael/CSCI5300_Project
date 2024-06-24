// savingsRoutes.js
const express = require('express');
const SavingsGoal = require('../models/SavingsGoal');
const router = express.Router();

router.post('/savings', async (req, res) => {
    const { userId, goalName, goalAmount, allocatedPercentage } = req.body;
    const savingsGoal = new SavingsGoal({ userId, goalName, goalAmount, allocatedPercentage });
    try {
        await savingsGoal.save();
        res.status(201).send(savingsGoal);
    } catch (error) {
        console.error('Error saving savings goal:', error);
        res.status(500).send('Error saving savings goal');
    }
});

router.get('/savings/:userId', async (req, res) => {
    console.log('Fetching savings goals for userId:', req.params.userId);
    try {
        const savingsGoals = await SavingsGoal.find({ _id: req.params.userId }); // Changed userId to _id
        if (!savingsGoals.length) {
            return res.status(404).send('Savings goals not found');
        }
        res.send(savingsGoals);
    } catch (error) {
        console.error('Error retrieving savings goals:', error);
        res.status(500).send('Error retrieving savings goals');
    }
});

module.exports = router;
