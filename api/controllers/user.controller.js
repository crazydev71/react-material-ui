import User from '../models/user';
import {addLog} from './log.controller';
import hash from 'password-hash';
import utils from '../utils'


export const login = (req, res) => {
  const {email, password} = req.body;
  
  User.where('email', email).fetch().then((model) => {
    if (model) {
      const user = model.toJSON();
      
      if (hash.verify(password, user.password)) {
        
        addLog(user.id, "login", "email", user.email);
        
        if (user.verified)
          return res.status(200).json({
            user: user,
            msg: "Login Succeeded"
          });
        else
          return res.status(203).json({
            user: user, 
            msg: "Please verify your phone"
          });
      }
    }
    
    return res.status(401).json({msg: "Invalid email or password!"});
  });
}


export const register = (req, res) => {
  const {name, email, password} = req.body;
  
  User.where('email', email).fetch().then(function(user) {
    if (user) {
      return res.status(413).json({ 
        msg: "Email already exist!" 
      });  
    } else {
      new User({
        name: name, 
        email: email, 
        password: hash.generate(password), 
        phone: "", 
        token: utils.makeToken({email: email}), 
        verified: false, 
        sms_code: ""
      }).save().then((newUser) => {
        const jsonUser = newUser.toJSON();
        
        addLog(jsonUser.id, "register", "email", jsonUser.email);
        
        delete jsonUser.password;
        return res.json({user: jsonUser, msg: "Register Succeeded! Please verify you with your phone."})
      })
    }
  });
}

export const requestSMSCode = async (req, res) => {
  const { phone } = req.body;
  const code = utils.random();
  
  const smsId = await utils.sendSMS(phone, code)
  
  if (smsId) {
    req.user.save({sms_code: code, phone: phone});
    
    return res.json({msg: "We've sent you a SMS code. Please Input the code to verify"});
  }
  return res.status(405).json({msg: "Something went wrong! Please check your phone number"});
}

export const verifySMSCode = (req, res) => {
  const { smsCode } = req.body;
  const user = req.user.toJSON();
  
  if (smsCode == user.sms_code) {
    req.user.save({verified: true});
    
    addLog(user.id, "verify", "sms_code", smsCode);
    
    return res.json({msg: "You are verified"});
  }
  else
    return res.status(406).json({msg: "SMS code error"});
}


export const getUsers = (req, res) => {
  User.fetchAll().then(function(users) {
    console.log(users.toJSON());
    res.json(users.toJSON());
  });
}

export const auth = (req, res) => {
  res.json({msg: "Authentication success"});
}