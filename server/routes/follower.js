const express = require('express')
const router = express.Router()
const followerController = require('../controllers/follower')
const authenticateToken = require('../middlewares/authenticateToken')


router.post('/', authenticateToken,  followerController.follow)
router.delete('/:followeeUsername', authenticateToken, followerController.unfollow)


module.exports = router