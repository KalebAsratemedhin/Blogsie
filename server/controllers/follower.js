const Follower = require('../models/followerModel')

const follow = async (req, res) => {
    try{
        const {followerId, followingId} = req.body
        const duplicate = await Follower.find({followerId, followingId})

        if(duplicate){
           return res.status(500).json({message: "Already a follower."})
        }
        const follow = await Follower.create({
            followerId: followerId,
            followingId: followingId
        })

        res.status(201).json({message: "Successfully followed user."})

    } catch (error){
        res.status(500).json({message: error})

    }
}


const unfollow = async (req, res) => {
    try{
        const {followerId, followingId} = req.body
        const follow = await Follower.deleteOne({followerId, followingId})      

        res.status(204).json({message: "Successfully unfollowed user."})

    } catch (error){
        res.status(500).json({message: error})

    }
}

module.exports = {
    follow,
    unfollow
}