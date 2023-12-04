// routes that handle login system.
// localhost:3000/account/signup: POST route for signup with a body of username and password
// localhost:3000/account/login: POST route for login with a body of username and password
// localhost:3000/account/logout: POST route for logout

import express from 'express';
const User = require('../models/user');
const isAuthenticated = require('../middlewares/isAuthenticated');
var bodyParser = require('body-parser')
const passport = require('passport')
const accountsRouter = express.Router();



accountsRouter.post("/signup", async function(req, res){
  try {
    const {username, password} = req.body;
    const user = new User({username});
    // await user.save();
    User.register(user, password, function(err, user){
      if(err){
        return res.status(409).send(err.message);
      } 
      passport.authenticate("local")(req, res, function(){
        console.log(`User ${username} successfully saved!`);
        return res.status(201).send(`User ${username} successfully saved!`);
        // res.redirect("/");
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving user!");
  }
})

accountsRouter.get('/login', function(req, res){
  return res.send(`get login page`);
});

accountsRouter.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      console.log(err)
      return next(err);
    }
    if (!user) {
      if(info.name === "IncorrectPasswordError") {
        return res.status(406).send(info.message);
      }
      return res.status(404).send(info);
    }
    req.logIn(user, function (err) {
      if (err) {
        console.log(err)
        return next(err);
      }
      return res.status(202).send("Successfully logged in!");
    });
  })(req, res, next);
});


accountsRouter.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { 
      return next(err); 
    }
    res.status(200).send(`Logout success!`);
  });
});


module.exports = accountsRouter


