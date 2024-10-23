const cors = require('cors');
const express = require('express');

const usersRouter = require('./routes/users.router');
const authRouter = require('./routes/auth.router');
const donationsRouter = require('./routes/donations.router'); // Import donations router

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/donations', donationsRouter); 

app.get('/', (req, res) => {
    res.json({
        message: "PatitasAlRescate APIv1"
    });
});

module.exports = app;

