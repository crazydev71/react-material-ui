import User from '../models/user';
import {addLog} from './log.controller';
import hash from 'password-hash';
import utils from '../utils'


export const login = (req, res) => {
  let {email, password} = req.body;
  email = email.toLowerCase();

  User.where('email', email).fetch().then((model) => {
    if (model) {
      const user = model.toJSON();
      
      if (hash.verify(password, user.password)) {
        
        addLog(user.id, user.name, "login", "email", user.email);
        
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
  let {name, email, password} = req.body;
  email = email.toLowerCase();
  
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
        
        addLog(jsonUser.id, jsonUser.name, "register", "email", jsonUser.email);
        
        delete jsonUser.password;
        return res.json({user: jsonUser, msg: "Register Succeeded! Please verify you with your phone."})
      })
    }
  });
}

export const requestSMSCode = async (req, res) => {
  const { phone } = req.body;
  const code = utils.random();
  try {
    // send sms
    const message = `${code} is your mendr code to verify`;
    const smsId = await utils.sendSMS(phone, message);
    //save in db
    req.user.save({sms_code: code, phone: phone});

    return res.json({msg: "We've sent you a SMS code. Please Input the code to verify"});
    
  } catch (err) {
    return res.status(405).json({msg: "Something went wrong! Please check your phone number"});  
  }
}

export const verifySMSCode = (req, res) => {
  const { smsCode } = req.body;
  const user = req.user.toJSON();
  
  if (smsCode == user.sms_code) {
    req.user.save({verified: true});
    addLog(user.id, user.name, "verify", "sms_code", smsCode);
    return res.json({msg: "You are verified"});
  }
  else
    return res.status(406).json({msg: "SMS code error"});
}


export const getUsers = (req, res) => {
  User.where('id', '>', 0).orderBy('created_at', 'ASC').fetchAll().then(function(users) {
    console.log(users.toJSON());
    res.json(users.toJSON());
  });
}

export const auth = (req, res) => {
  const user = req.user.toJSON();
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

export const updateProfile = async (req, res) => {
  const user = req.user.toJSON();
  const { profile } = req.body;
  if (user.id == profile.id || user.role == 'admin') {
    try {
      const profileUser = await User.where('id', profile.id).fetch();
      await profileUser.save({
        name: profile.name, 
        email: profile.email,
        gender: profile.gender,
        role: profile.role
      });
      return res.json({profile: profileUser.toJSON()});
    } catch (e) {
      return res.status(405).json({msg: "Something went wrong! Please resubmit the profile."});
    }
  }
  return res.status(405).json({msg: "Permission denied"})
}