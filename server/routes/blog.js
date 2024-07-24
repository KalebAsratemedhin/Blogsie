const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blog')
const authenticateToken = require('../middlewares/authenticateToken')


router.get('/:username',authenticateToken, blogController.getBlogs)
router.post('/', authenticateToken, blogController.createBlog)  
router.put('/:id', authenticateToken, blogController.updateBlog)   


module.exports = router

