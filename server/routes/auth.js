const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const authenticateToken = require('../middlewares/authenticateToken')

router.get('/check-session', authenticateToken, authController.checkSession)
router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/logout', authController.logout)


module.exports = router