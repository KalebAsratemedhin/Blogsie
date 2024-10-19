const express = require('express');
const router = express.Router();
const {
    follow,
    unfollow,
    getFollowSummary
} = require("../controllers/follow");
const { authenticateUser } = require('../middlewares/auth');

router.get('/', authenticateUser, getFollowSummary);
router.post('/', authenticateUser, follow);
router.delete('/', authenticateUser, unfollow);


module.exports = router;
