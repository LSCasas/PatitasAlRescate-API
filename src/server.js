const cors = require('cors');
const express = require('express');

const usersRouter = require('./routes/users.router');
const authRouter = require('./routes/auth.router');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/auth', authRouter);


app.get('/', (req, res) => {
    res.json({
        message: "PatitasAlRescate APIv1"
    });
});

module.exports = app;

