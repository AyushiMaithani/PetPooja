require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const config = require('./config/config');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const cookieParser = require('cookie-parser');
const app = express();


const PORT = config.port;
connectDB();

//middlewares
app.use(express.json());
app.use(cookieParser());

//root endpoint
app.get('/', (req, res) => {
    res.json ({message: 'Hello from Server!'});
});

//other endpoints
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/order', require('./routes/orderRoute'));

//global error handler(to be at last)
app.use(globalErrorHandler)

//server
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});

