const User = require("../models/user")
const upload = require("../middlewares/fileUpload");

const getUser = async (req, res) => {
    try {
        const { id } = req.user;
        console.log('find user', id, req.user) 
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        return res.status(200).json({ ...user.toObject() });
    
    } catch (error) {
        res.status(500).json({ message: 'Server Error.' });
    }
}; 


const findAllUsers = async (req, res) => {
    try {
        const users = await User.findMany({});

        return res.status(200).json(users)

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}

const findOneUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id);

        return res.status(200).json(user)

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}

const updateUser = async (req, res) => {
    try {

        const {id} = req.params 

       
        if (id !== req.user.id){
            return res.status(401).json({message: 'Unauthorized.'})
        }

        const user = await User.findByIdAndUpdate(id, req.body);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User updated successfully', user });

        
    } catch (error) {
        res.status(500).send({message: error.message})

    }

}

const updateProfilePicture = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {

        return res.status(400).json({ message: err });
      }
      
      try {

        const userId = req.params.id;
        const user = await User.findById(userId);
        
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }


  
        user.profilePic = `${process.env.BACKEND_URL}/uploads/${req.file.filename}`;
        await user.save();
  
        res.status(200).json({ message: "Profile picture updated", user });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  }
  


module.exports = {
    getUser,
    findAllUsers,
    findOneUser,
    updateUser,
    updateProfilePicture
}