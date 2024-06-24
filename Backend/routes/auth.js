

// This file defines the authentication routes for your application.

// These are Dependencies:
// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const cors = require('cors'); // Import CORS module


//Creating a router
const router = express.Router();

router.use(cors({
    origin: 'http://localhost:3000',
  }));


// Registration Endpoint:

// Handles user registration by creating a new user document in MongoDB.

// Register
router.post('/register', async (req, res) => {
    console.log('Register request body:', req.body);

    const { username, password } = req.body;
    try{
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    console.log('User registered:', newUser);

    res.status(201).send('User registered');
    }catch(error){
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Login request body:', req.body);
try{
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }}catch(error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Error logging in user');
    }
});

module.exports = router;
