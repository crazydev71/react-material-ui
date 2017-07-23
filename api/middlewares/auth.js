import jwt from 'express-jwt';
import unless from 'express-unless';
import User from '../models/user';

const authenticate = jwt({
  secret: process.env.JWT_SECRET,
  getToken: function fromHeaderOrQuerystring (req) {
    console.log("--------------------------");
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
  }
});

authenticate.unless = unless;

const authError = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({'message': 'invalid token...'});
  }
};

const setUser = (req, res, next) => {
  console.log(req.user);
  if (!req.user)
    return next();
  
  User.where("email", req.user.email).fetch().then((user) => {
    if (user) {
      req.user = user;
      return next();  
    } else {
      return res.status(413).json({'msg': 'Something went wrong!'})
    }
  }).catch((err) => {
    return res.status(413).json({'msg': 'Something went wrong!'});
  })
};

export {
  authenticate,
  authError,
  setUser
};