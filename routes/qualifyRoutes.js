const express = require('express')
const router = express.Router();
const authmiddleware = require('../middlewares/auth');

const qualifyCtrl = require("../controllers/qualifyController")


// router.post('/qualify/update', authmiddleware, qualifyCtrl.update);
// router.post('/qualify/info', authmiddleware, qualifyCtrl.info);
// router.post('/qualify/action', authmiddleware, qualifyCtrl.action);

router.get('/qualify/update', qualifyCtrl.update);
router.get('/qualify/info', qualifyCtrl.info);
router.post('/qualify/action', qualifyCtrl.action);


module.exports = router;