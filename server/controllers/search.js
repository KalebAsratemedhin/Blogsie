const User = require('../models/userModel')

const searchUsers = async (req, res) => {
    console.log("hello before")

    const query = req.query.q;
    console.log("hello", query)
  
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
  
    try {
      const users = await User.find({
        fullName: { $regex: query, $options: 'i' }  
      });
      console.log('found', users)
      
  
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Server error' });
    }
}



module.exports = {
    searchUsers
}