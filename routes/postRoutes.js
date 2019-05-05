const express = require('express')
const router = express.Router();


const postCtrl = require("../controllers/posts")


router.post('/post/add', postCtrl.AddPost);


module.exports = router;