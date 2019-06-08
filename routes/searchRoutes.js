const express = require('express')
const router = express.Router();
const authmiddleware = require('../middlewares/auth');

const searchCtrl = require("../controllers/searchController")


router.get('/search/all', searchCtrl.GetAll);
router.get('/search/auto', searchCtrl.AutoComplete);
router.post('/search/place', authmiddleware, searchCtrl.GetPlace);


module.exports = router;