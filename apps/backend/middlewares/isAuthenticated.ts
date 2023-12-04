import { RequestHandler } from 'express';

const isAuthenticated: RequestHandler = (req, res, next) => {
  if(req.isAuthenticated()){
    next();
  } else {
    // res.status(500).send('Error: Not logged in!');
    console.log("Error: Not logged in!");
    res.status(403).send('Error: Not logged in!');
  }

};

module.exports = isAuthenticated;