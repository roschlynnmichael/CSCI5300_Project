
//next code
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Creating an express application
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors());


// Database connection
mongoose.connect('mongodb+srv://mmohammad4:krJSeKTxgTSBlij1@se-project.zahmrjp.mongodb.net/SE-Project?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB Atlas connected...');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Routes Setup
const authRoutes = require('./routes/auth');
const budgetRoutes = require('./routes/budgetRoutes');
const savingsRoutes = require('./routes/savingsRoutes');



app.use('/auth', authRoutes);
app.use('/api', budgetRoutes);
app.use('/api', savingsRoutes);



// Example route for fetching user by ID
// app.get('/api/user/:userId', userController.getUserById);



// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Starting the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


