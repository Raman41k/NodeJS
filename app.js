const express = require('express');
const swaggerUI = require('swagger-ui-express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouter = require('./router/user.router');
const authRouter = require('./router/auth.router');
const configs = require('./config/config');
const {cronRunner} = require("./cron");
const swaggerJSON = require("./swagger.json");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));

app.get('/', (req, res) => {
    res.json('Welcome');
});

app.use((err, req, res, next) => {

    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 402
    });
});

app.listen(configs.PORT, async () => {
    console.log(`Server listen ${configs.PORT}`);
    await mongoose.connect(`${configs.MONGO_URL}`);
    // cronRunner();
});