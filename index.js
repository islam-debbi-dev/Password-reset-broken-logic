const express = require('express');
const app = express();
const  connectDB  = require('./configration/db');
const path = require('path');
const port = 3000;
const page = require('./routes/pages');
const auth = require('./routes/auth');
const password = require('./routes/password');
const dotenv = require('dotenv');
const {errorHandler,notFound} = require('./middlewares/error');
app.use(express.json());
// Load environment variables from .env file
dotenv.config();

// Set the views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // Set the view engine to ejs


// connect to mongodb
connectDB();

app.use('/page', page);
app.use('/auth', auth);
app.use('/password', password);


// not found middleware
app.use(notFound);
// error handling middleware
app.use(errorHandler);

// listen to port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});