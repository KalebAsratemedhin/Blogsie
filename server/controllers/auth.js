const User = require('../models/userModel')
const {verifyToken, generateToken} = require('../utils/jwtUtils')
const bcrypt = require('bcrypt')


const checkSession = async (req, res) => {
    try {
        const token = req.cookies.token
        const {username} = verifyToken(token);
        console.log("username", username, email)
        if(username && email){
            console.log("Have a session")
            return res.status(200).json({username, email})

        }
        console.log("DOnt Have a session")

        return res.status(404).json({})


    } catch (error) {
        console.log("Have an error")

        res.status(500).json({message: error})

    }
}

const signup = async (req, res) => {
    const {fullName, email, username, password, bio} = req.body
    const hashedPassword = await bcrypt.hash(password, 10);

    try{
        const [duplicate] = await User.find({email: email, username: username})
        if (duplicate){
            console.log(duplicate, "duplicate")
            return res.status(500).json({message: "Duplicate account found."})

        }
        
        const user = await User.create({
            fullName: fullName,
            email: email,
            username: username,
            password: hashedPassword,
            bio: bio

        })
        const token = generateToken(username, email);
        res.cookie('token', token, { httpOnly: true, secure: true }); 
        res.status(201).json({ username, email});
        console.log("signed up")

    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error });
    }
}


const login = async (req, res) => {
    const {username, password} = req.body
    try {
        const user = await User.findOne({ username: username });

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const token = generateToken(user.username, user.email);
                res.cookie('token', token, { httpOnly: true, secure: true });
                res.status(200).json({ username: user.username, email: user.email });
            } else {
              return res.status(400).json({ message: 'Invalid username or password' });
            }
          });

        

      } catch (error) {
        res.status(500).json({ message: error });
      }
}

const logout = async (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
    })
    res
        .status(200)
        .json({ success: true, message: 'User logged out successfully' })
}


module.exports = {
    checkSession,
    signup,
    login,
    logout
}