// // budgetRoutes.js
// const express = require('express');
// const Budget = require('../models/Budget');
// const router = express.Router();

// router.post('/budget', async (req, res) => {
//     const { userId, income, expenses } = req.body;
//     const budget = new Budget({ userId, income, expenses });
//     try {
//         await budget.save();
//         res.status(201).send(budget);
//     } catch (error) {
//         console.error('Error saving budget data: ', error);
//         res.status(500).send('Error saving budget data');
//     }
// });

// router.get('/budget/:userId', async (req, res) => {
//     console.log('Fetching budget for userId:', req.params.userId);
//     try {
//         const budget = await Budget.findOne({ _id: req.params.userId }); // Changed userId to _id
//         if (!budget) {
//             return res.status(404).send('Budget not found');
//         }
//         res.send(budget);
//     } catch (error) {
//         console.error('Error retrieving budget data:', error);
//         res.status(500).send('Error retrieving budget data');
//     }
// });

// module.exports = router;




const express = require('express');
const Budget = require('../models/Budget');
const router = express.Router();

router.post('/budget/income', async (req, res) => {
    const { userId, date, amount } = req.body;
    try {
        let budget = await Budget.findOne({ userId });
        if (!budget) {
            budget = new Budget({ userId, income: [], expenses: [] });
        }
        budget.income.push({ date, amount });
        await budget.save();
        res.status(201).send(budget);
    } catch (error) {
        console.error('Error adding income: ', error);
        res.status(500).send('Error adding income');
    }
});

router.post('/budget/expense', async (req, res) => {
    const { userId, date, amount } = req.body;
    try {
        let budget = await Budget.findOne({ userId });
        if (!budget) {
            budget = new Budget({ userId, income: [], expenses: [] });
        }
        budget.expenses.push({ date, amount });
        await budget.save();
        res.status(201).send(budget);
    } catch (error) {
        console.error('Error adding expense: ', error);
        res.status(500).send('Error adding expense');
    }
});

module.exports = router;
