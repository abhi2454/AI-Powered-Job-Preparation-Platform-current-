const express = require('express');
const authRouter = require("./routes/auth.routes")      //require all the routes
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/api/auth', authRouter);                       //using all the routes here


module.exports = app;