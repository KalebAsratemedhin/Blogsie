// // 
const User = require('../models/user')

const follow = async (req, res) => {
    const { followeeUsername } = req.body;
    const follower = req.user
  
    if (!followeeUsername) {
      return res.status(400).json({ message: 'A followee username is required.' });
    }
  
    try {
      const followee = await User.findOne({username: followeeUsername});
      if (!followee) {
        return res.status(404).json({ message: 'User to follow was not found.' });
      }
  

      if (followee.followers.includes(follower.username)) {
        return res.status(400).json({ message: 'You are already following this user.' });
      }
  
      followee.followers.push(follower.username);

      await followee.save();

      follower.followings.push(followeeUsername)
      await follower.save()
  
      res.status(201).json({ message: 'Successfully followed the user.' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error.', error });
    }
  };

const unfollow = async (req, res) => {
    const { followeeUsername } = req.body;
    const follower = req.user
  
    if (!followeeUsername) {
      return res.status(400).json({ message: 'A followee username is required.' });
    }
  
    try {
      const followee = await User.findOne({username: followeeUsername});
      if (!followee) {
        return res.status(404).json({ message: 'User to unfollow was not found.' });
      }
  

      if (!followee.followers.includes(follower.username)) {
        return res.status(400).json({ message: 'You are not following this user.' });
      }

      followee.followers.filter((username) => username != follower.username)

      await followee.save();

      follower.following.filter((username) => username != followeeUsername)
      await follower.save()
  
      res.status(201).json({ message: 'Successfully unfollowed the user.' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error.', error });
    }
}

module.exports = {
    follow,
    unfollow
}