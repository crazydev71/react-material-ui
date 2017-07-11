import crypto from 'crypto';

const random = (howMany = 6, chars = "0123456789") => {
  var rnd = crypto.randomBytes(howMany)
      , value = new Array(howMany)
      , len = chars.length;

  for (var i = 0; i < howMany; i++) {
      value[i] = chars[rnd[i] % len];
  }

  return value.join('');
}

export default random;