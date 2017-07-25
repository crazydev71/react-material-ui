import Request from '../models/request';
import {addLog} from './log.controller';
import hash from 'password-hash';
import utils from '../utils'

const { MALE, FEMALE } = process.env;

export const sendRequest = async (req, res) => {
  const user = req.user.toJSON();
  const { comment, gender } = req.body;
  const message = `From: ${user.name} @ ${user.phone}, requested gender: ${gender}, notes: ${comment}`;

  try {
    // save in db
    new Request({ 
      user_id: user.id, 
      name: user.name, 
      phone: user.phone, 
      comment: comment, 
      gender: gender,
      status: 'open',
    }).save(); 
    
    //send sms
    if (gender == 'female') {
      const smsId = await utils.sendSMS(FEMALE , message);
    } else {
      const smsId = await utils.sendSMS(MALE , message);
    }
    
    addLog(user.id, user.name, "request", "gender", gender);
    return res.json({ success: true });
    
  } catch (err) {
    return res.json({ success: false, error: err });
  }
};


const getRequests = () => {
  return new Promise((resolve, reject) => {
    Request.fetchAll().then((data, err) => {
      resolve(data.toJSON());
      if (err) {
        reject(err);
      }
    });
  });
}

export const getAllRequests = async (req, res) => {
  const data = await getRequests();
  res.json(data);
};
