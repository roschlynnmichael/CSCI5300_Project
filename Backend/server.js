// // server.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors=require('cors');

// //Crteating an express application
// const app = express();
// const PORT = process.env.PORT || 5001;


// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Database connection
// // mongoose.connect('mongodb://localhost:27017/budget-forecast', {

// // mongoose.connect('mongodb+srv://mmohammad4:krJSeKTxgTSBlij1@SE-Project.zahmrjp.mongodb.net/?retryWrites=true&w=majority&appName=SE-Project',{
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true
// // }).then(()=>{
// //     console.log('MongoDB connected...');
// // }).catch(err=>{
// //     console.error(err);
// // });

// // Database connection
// mongoose.connect('mongodb+srv://mmohammad4:krJSeKTxgTSBlij1@se-project.zahmrjp.mongodb.net/SE-Project?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('MongoDB Atlas connected...');
// }).catch(err => {
//   console.error('MongoDB connection error:', err);
// });



// ///Routes Setup:

// //Setting up routes for authentication, which will handle user registration and login.
// // server.js
// const authRoutes = require('./routes/auth');
// app.use('/auth', authRoutes);
// const budgetRoutes = require('./routes/budgetRoutes');
// const savingsRoutes = require('./routes/savingsRoutes');
// // app.use('/auth', authRoutes);
// app.use('/api', budgetRoutes);
// app.use('/api', savingsRoutes);


// // router.use(cors({
// //     origin: 'http://localhost:3000',
// //   }));

// // Routes
// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });


// // Starting the Server:

// // The server listens on a specified port (5001 in this case).
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });



// mongodb+srv://mmohammad4:krJSeKTxgTSBlij1@se-project.zahmrjp.mongodb.net/?retryWrites=true&w=majority&appName=SE-Project






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

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Starting the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


