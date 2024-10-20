const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


const signup = async (req, res) => {
    try {
        const { username, fullName, password, email } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const duplicate = await User.findOne({ email, username });

        if (duplicate) {
            return res.status(409).json({ message: 'Duplicate account found.' });
        }

        const user = await User.create({
            fullName,
            email,
            username,
            password: hashedPassword,
        });

        const payload = { id: user._id, username: user.username };
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });

        res.status(201).json({
            accessToken: token,
            id: user._id, 
            username: user.username
        });

    } catch (error) {
        res.status(500).json({ message: 'Server Error.' });
    }
}; 


const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        const payload = { id: user._id, username: user.username };
        const token = jwt.sign(payload, secret, { expiresIn: '2h' });

        res.status(200).json({ 
            accessToken: token,
            id: user._id, 
            username: user.username
         });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 


const googleAuthSuccess = async (req, res) => {
    const token = jwt.sign({ id: req.user.id, username: req.user.username }, secret, { expiresIn: '2h' });
    const redirectUrl = `${process.env.CLIENT_URL}/google-auth?id=${req.user.id}&role=${req.user.role}&token=${token}`;
    res.redirect(redirectUrl);  
};


module.exports = {
    signup,
    signin,
    googleAuthSuccess
};