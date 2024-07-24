const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile')
const authenticateToken = require('../middlewares/authenticateToken')
const upload = require('../middlewares/fileUpload')

router.get('/:username', authenticateToken, profileController.getProfile)
router.put('/:username', authenticateToken, profileController.updateProfile)
router.post('/profile-pic', authenticateToken,  upload.single('profilePic'), profileController.uploadProfilePic)

module.exports = router
