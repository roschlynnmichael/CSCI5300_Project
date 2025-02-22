
const express = require('express');
const router = express.Router();
const cors = require('cors'); 
const authMiddleware = require('../middleware/authMiddleware');
const userController=require('../controllers/userController');

router.use(cors({ // Enable CORS for all routes
    origin: ['https://easy-budget-4zd6.onrender.com','http://localhost:3000'],
    credentials : true
}));

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/income', authMiddleware, userController.addIncome);
router.post('/expense', authMiddleware, userController.addExpense);
// router.post('/user',userController.getUser);

module.exports = router;

