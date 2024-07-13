const express = require('express')
const router = express.Router()
const followerController = require('../controllers/follower')

router.post('/', followerController.follow)
router.delete('/', followerController.unfollow)


module.exports = router