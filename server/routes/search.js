const express = require('express')
const router = express.Router()
const searchController = require('../controllers/search')
const authenticateToken = require('../middlewares/authenticateToken')

router.get('/users', authenticateToken, searchController.searchUsers)
// router.put('/:username', authenticateToken, .updateProfile)

module.exports = router
