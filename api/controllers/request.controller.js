import Request from '../models/request';
import User from '../models/user';
import Booking from '../models/booking';

import {addLog} from './log.controller';
import hash from 'password-hash';
import utils from '../utils'

const { MALE, FEMALE } = process.env;

export const sendRequest = async (req, res) => {
  const user = req.user.toJSON();
  let { comment, gender, request_time, booking_id, handler_id } = req.body;

  console.log({ comment, gender, request_time, booking_id, handler_id });
  
  const message = `From: ${user.name} @ ${user.phone}, requested gender: ${gender}, notes: ${comment}`;
  try {
    // save in db
    const handler = await User.where({id: handler_id}).fetch();
    const booking = await Booking.where({id: booking_id}).fetch();
    
    const newRequest =  new Request({ 
      user_id: user.id, 
      name: user.name, 
      phone: user.phone, 
      comment: comment, 
      gender: gender,
      request_time: request_time,
      handler_id: handler_id,
      handler_name: handler.toJSON().name,
      status: 'assigned',
    });

    await newRequest.save();

    await booking.save({status: 'booked', request_id: newRequest.toJSON().id});
    
    //send sms
    
    if (gender == 'female') {
      const smsId = await utils.sendSMS(FEMALE , message);
    } else {
      const smsId = await utils.sendSMS(MALE , message);
    }
    
    addLog(user.id, user.name, "request", "gender", gender);

    return res.json(booking.toJSON());
    
  } catch (err) {
    console.log(err);
    return res.status(405).json(err);
  }
};

export const getAllBookings = (req, res) => {
  Request.where('status', '!=', 'completed').orderBy('created_at', 'DESC').fetchAll().then((data, err) => {
    if (err)
      return res.status(405).json({msg: "error"});
    return res.json(data.toJSON())
  });
}

const getRequests = (req, res) => {
  const user = req.user.toJSON();
  if (user.role == 'admin') {
    return new Promise((resolve, reject) => {
      Request.where('id', '>', 0).orderBy('created_at', 'DESC').fetchAll().then((data, err) => {
        resolve(data.toJSON());
        if (err) {
          reject(err);
        }
      });
    });  
  } else {
    return new Promise((resolve, reject) => {
      Request.where('gender', user.gender).orderBy('created_at', 'DESC').fetchAll().then((data, err) => {
        resolve(data.toJSON());
        if (err) {
          reject(err);
        }
      });
    });  
  }
}

export const getAllRequests = async (req, res) => {
  const data = await getRequests(req, res);
  res.json(data);
};

export const updateRequest = async (req, res) => {
  const user = req.user.toJSON();
  const { request_id, status, handler_id, handler_name} = req.body;
  try {
    const model = await Request.where('id', request_id).fetch();
    if (model) {

      await model.save({
        handler_id: handler_id || user.id,
        handler_name: handler_name || user.name,
        status: status || 'assigned'
      });
      
      const request = model.toJSON();

      let handler = await User.where('id', request.handler_id).fetch();
      handler = handler.toJSON();

      console.log(handler);

      if (request.status == 'assigned') {
        const message = `Your request has been accepted by ${handler.name} from Mendr.\n You can contact him via phone(${handler.phone}) or via email(${handler.email})`;
        await utils.sendSMS(request.phone, message);
      } else if (request.status == 'completed') {
        const message = `Your request has been completed by ${handler.name} from Mendr.\n We hope you are satisfied with our service. Thank you.`;
        await utils.sendSMS(request.phone, message);
      }
      
      return res.json(request);
    }
  } catch (e) {
    return res.status(405).json({msg: 'Whoops! Something went wrong. Try again!'})
  }
}