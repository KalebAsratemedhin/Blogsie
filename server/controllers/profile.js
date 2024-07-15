const User = require('../models/userModel')

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

    })



}

const updateProfile = (req, res) => {

}

module.exports = {
    getProfile,
    updateProfile
}
