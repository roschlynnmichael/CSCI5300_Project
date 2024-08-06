
const express = require('express');
const router = express.Router();
const cors = require('cors'); 
const authMiddleware = require('../middleware/authMiddleware');
const userController=require('../controllers/userController');

router.use(cors({
    origin: 'http://localhost:3000',
}));

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/income', authMiddleware, userController.addIncome);
router.post('/expense', authMiddleware, userController.addExpense);

module.exports = router;

