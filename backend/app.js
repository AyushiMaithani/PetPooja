require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const config = require('./config/config');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const app = express();

const PORT = config.port;
connectDB();

//root endpoint
app.get('/', (req, res) => {
    res.json ({message: 'Hello from Server!'});
});

//global error handler
app.use(globalErrorHandler)

//server
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});

