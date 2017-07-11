import JWT from 'jsonwebtoken';

const makeToken = (payload) => {
  return JWT.sign(payload, process.env.JWT_SECRET);
}

export default makeToken;