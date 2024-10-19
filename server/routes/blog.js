const express = require('express');
const router = express.Router();
const {
    findAllUserBlogs,
    findOneBlog,
    createBlog,
    updateBlog,
    deleteBlog
} = require("../controllers/blog");
const { authenticateUser } = require('../middlewares/auth');

router.get('/:id', authenticateUser, findOneBlog);
router.get('/', authenticateUser, findAllUserBlogs);

router.post('/', authenticateUser, createBlog);
router.put('/:id', authenticateUser, updateBlog);
router.delete('/:id', authenticateUser, deleteBlog);

module.exports = router;
