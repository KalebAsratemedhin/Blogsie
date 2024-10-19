const Follow = require('../models/follow')


const getFollowSummary = async(req, res) => {
  try {
      const user = req.user

      const followers = await Follow.countDocuments({
          following: user.username
      })

      const following = await Follow.countDocuments({
        follower: user.username
      })

      res.status(200).json({success: true, data: {followers, following}})
      
  } catch (error) {
      res.status(500).json({message: error.message})
      
  }

}

const follow = async(req, res) => {
    try {
        const {following} = req.body
        const user = req.user


        if(user.username == following){
            return res.status(400).json({message: "You cannot follow yourself."})
        }
        const result = await Follow.create({
            following,
            follower: user.username
        })


        res.status(201).json(result)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }

}

const unfollow = async(req, res) => {
    try {
        const {following} = req.body
        const result = await Follow.findByOneAndDelete({following, follower: req.user.username})

        if(!result)
            return res.status(404).json({message: "You are not a follower."})

        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
    
}


module.exports = {
    follow,
    unfollow,
    getFollowSummary
}