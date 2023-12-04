import mongoose, { ConnectOptions } from 'mongoose';
import express, { Request, Response } from 'express';
const bodyParser = require('body-parser');
const accountsRouter = require('../routes/account');
const apiRouter = require('../routes/api');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const flash = require('connect-flash');



// const MONGO_URI = "mongodb://lizhx:VlgzWgDRYVRVcI06@cluster0.slrc869.mongodb.net/?retryWrites=true&w=majority";
const MONGO_URI = "mongodb://localhost:27017/hw-8"
mongoose.connect(MONGO_URI, { useNewUrlParser: true }  as ConnectOptions);

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type');
  next();
});

// app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());

app.use(require("express-session")({
  secret: "key",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", accountsRouter);
app.use("/expenses", apiRouter);

// Start listening for requests
app.listen(port, () => {
  console.log('Listening on port ' + port);
});