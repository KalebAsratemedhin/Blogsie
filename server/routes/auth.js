const express = require('express');
const {
    signin,
    signup,
    googleAuthSuccess
} = require('../controllers/auth.js')
const passport = require('passport');

const router = express.Router();
 

router.post('/signup', signup);

router.post('/signin', signin)

router.get('/google', (req, res, next) => {
  console.log('initiated')
    next();
  }, passport.authenticate('google', {
  scope: ['profile', 'email']  
}));

router.get('/google/callback', (req, res, next) => {
  console.log('done' )

    next(); 
  }, passport.authenticate('google', { session: false }), googleAuthSuccess);


router.get('/auth/error', (req, res) => {
    res.status(401).json({ error: 'Google OAuth authentication failed' });
});

module.exports = router