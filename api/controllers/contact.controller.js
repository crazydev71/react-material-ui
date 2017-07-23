import Contact from '../models/contact';
import {addLog} from './log.controller';
import hash from 'password-hash';
import utils from '../utils'

const { MALE, FEMALE } = process.env;

export const sendContact = async (req, res) => {
  const user = req.user.toJSON();
  const { comment, gender } = req.body;
  console.log ({comment, gender});
  const message = `From: ${user.name} @ ${user.phone}, requested gender: ${gender}, notes: ${comment}`;
  try {
    // save in db
    new Contact({ user_id: user.id, name: user.name, phone: user.phone, comment: comment, gender: gender }).save(); 
    //send sms
    if (gender == 'female') {
      const smsId = await utils.sendSMS(FEMALE , message);
    } else {
      const smsId = await utils.sendSMS(MALE , message);
    }
    addLog(user.id, "Send a request", "gender", gender);
    return res.json({ success: true });
    
  } catch (err) {
    return res.json({ success: false, error: err });
  }
};


const getContacts = () => {
  return new Promise((resolve, reject) => {
    Contact.fetchAll().then((data, err) => {
      resolve(data.toJSON());
      if (err) {
        reject(err);
      }
    });
  });
}

export const getAllContacts = async (req, res) => {
  const data = await getContacts();
  res.json(data);
};
