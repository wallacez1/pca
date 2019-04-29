const express = require('express')
const router = express.Router();
const multer = require('multer');
const upload = multer();

const postCtrl = require("../controllers/posts")


router.post('/post/add', upload.single('file'),postCtrl.AddPost);


module.exports = router;