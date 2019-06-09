const express = require('express')
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const userMiddleware = require('../middlewares/user');
const produtoMiddleware = require('../middlewares/produto');

const qualifyCtrl = require("../controllers/qualifyController")


// router.post('/qualify/update', authMiddleware, qualifyCtrl.update);
// router.post('/qualify/info', authMiddleware, qualifyCtrl.info);
// router.post('/qualify/action', authMiddleware, qualifyCtrl.action);

router.get('/qualify/update', 
    produtoMiddleware, 
    qualifyCtrl.update
);

router.get('/qualify/info', 
    authMiddleware, 
    userMiddleware, 
    produtoMiddleware, 
    qualifyCtrl.info
);

router.post('/qualify/action', 
    authMiddleware, 
    userMiddleware, 
    produtoMiddleware, 
    qualifyCtrl.action
);


module.exports = router;