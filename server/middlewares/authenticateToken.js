const {verifyToken} = require('../utils/jwtUtils')
const User = require('../models/user')

const authenticateToken = async (req, res, next) => {
  try{

  const payload = verifyToken(req.cookies.token);
  
  if (payload){
    const {username} = payload
    const user = await User.findOne({username})
    req.user = user
    next() 
  } 
  } catch(error){
    console.log("hello sent error")
      if(error.message == "Not Authorized"){
        // return res.status(401).json({message: error.message})
        return res.status(401).json(error.message)
      }
    res.status(500).json(error)
  }
};

module.exports = authenticateToken;