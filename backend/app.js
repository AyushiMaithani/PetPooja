require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const config = require('./config/config');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();


const PORT = config.port;
connectDB();

//middlewares
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173']
}))
app.use(express.json());
app.use(cookieParser());


//root endpoint
app.get('/', (req, res) => {
    res.json ({message: 'Hello from Server!'});
});

//other endpoints
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/order', require('./routes/orderRoute'));
app.use('/api/table', require('./routes/tableRoute'));

//global error handler(to be at last)
app.use(globalErrorHandler)

//server
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});

