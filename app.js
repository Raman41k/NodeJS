const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const configs = require('./config/config');
const {carRouter,userRouter} = require("./router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/cars', carRouter);

app.get('/', (req, res) => {
    res.json('Welcome');
});

app.use((err,req, res, next) => {

    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 402
    });
});

app.listen(configs.PORT,  async () => {
    console.log(`Server listen ${configs.PORT}`);
    await mongoose.connect(`${configs.MONGO_URL}`);
});