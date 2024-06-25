const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).send('User registered');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
};

// Login a user
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
            res.json({ token });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Error logging in user');
    }
};
exports.addIncome = async (req, res) => {
    const { date, amount } = req.body;
    try {
        const user = await User.findById(req.user.id);
        user.income.push({ date, amount });
        await user.save();
        res.status(200).send('Income added');
    } catch (error) {
        console.error('Error adding income:', error);
        res.status(500).send('Error adding income');
    }
};

exports.addExpense = async (req, res) => {
    const { date, amount } = req.body;
    try {
        const user = await User.findById(req.user.id);
        user.expenses.push({ date, amount });
        await user.save();
        res.status(200).send('Expense added');
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).send('Error adding expense');
    }
};
