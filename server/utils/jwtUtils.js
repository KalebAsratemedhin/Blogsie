const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (username, email) => {
  return jwt.sign({ email: email, username: username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const verifyToken = (token) => {
  console.log("hellow", token)
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("hey")
      throw Error("Not Authorized")
    }
  
    return decoded
  });
};



module.exports = { generateToken, verifyToken };
