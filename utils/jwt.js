const jwt = require("jsonwebtoken");
require('dotenv').config()

// move to .env
const SECRET_KEY = process.env.SECRET_KEY


function createToken(data) {
  const token = jwt.sign(
    {  data },
    SECRET_KEY,
    { expiresIn: process.env.EXPIRE_TOKEN }
  );

  return token
}

function decodeToken(token) {
  const decoded = jwt.verify(token, SECRET_KEY);
  return decoded
}

module.exports = {
    createToken,
    decodeToken,
}


