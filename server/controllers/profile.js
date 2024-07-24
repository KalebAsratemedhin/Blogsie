const User = require('../models/user')

const getProfile = async (req, res) => {
    const {username} = req.params
    console.log(username, 'prof req')

    const user = await User.findOne({username})

    if (!user){
        return res.status(404).json({message: "No such user!"})
    }


    res.status(200).json({
        username: user.username,
        fullName: user.fullName,
        bio: user.bio,
        email: user.email,
        followers: user.followers,
        following: user.following

    })



}

const updateProfile = (req, res) => {

}

const path = require('path');

const uploadProfilePic = async (req, res) => {
  console.log("upload controller", req.file)
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const profilePicUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const user = req.user
    if (user){
        await User.findByIdAndUpdate(user._id, {profilePic: profilePicUrl})
    }

    return res.status(201).json({ message: 'Profile picture uploaded successfully', profilePicUrl });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while uploading the profile picture', error: error.message });
  }
};


module.exports = {
    getProfile,
    updateProfile,
    uploadProfilePic
}
