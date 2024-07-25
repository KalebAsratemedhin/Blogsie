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
  
      if (followee.followers.includes(follower._id)) {
        return res.status(400).json({ message: 'You are already following this user.' });
      }
  
      followee.followers.push(follower._id);
      await followee.save();

      follower.following.push(followee._id)
      await follower.save()
  
      res.status(201).json({ message: 'Successfully followed the user.', followerId: follower._id });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error.', error });
    }
  };

  const unfollow = async (req, res) => {
    const { followeeUsername } = req.params;
    const follower = req.user;

    if (!followeeUsername) {
        return res.status(400).json({ message: 'A followee username is required.' });
    }

    try {
        const followee = await User.findOne({ username: followeeUsername });
        if (!followee) {
            return res.status(404).json({ message: 'User to unfollow was not found.' });
        }

        if (!followee.followers.includes(follower._id.toString())) {
            console.log("Not following");
            return res.status(400).json({ message: 'You are not following this user.' });
        }


        followee.followers = followee.followers.filter((id) => id.toString() !== follower._id.toString());
        await followee.save();

        follower.following = follower.following.filter((id) => id.toString() !== followee._id.toString());
        await follower.save();

        res.status(200).json({ message: 'Successfully unfollowed the user.', followerId: follower._id });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', error });
    }
};


module.exports = {
    follow,
    unfollow
}