const express = require('express')
const router = express.Router();
const authmiddleware = require('../middlewares/auth');

const postCtrl = require("../controllers/postsController")


router.post('/post/add', authmiddleware, postCtrl.AddPost);


module.exports = router;