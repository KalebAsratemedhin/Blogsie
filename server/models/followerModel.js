
const mongoose = require('mongoose')
const followerSchema = mongoose.Schema({
    followingId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    followerId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true 
    },
});

  const Follower = mongoose.model('Follower', followerSchema);
  module.exports = Follower;
  