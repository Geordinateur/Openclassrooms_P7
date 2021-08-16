const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', auth, admin, userCtrl.getAll);
router.get('/admin', auth, admin, userCtrl.getAll);
router.get('/:userId', auth, userCtrl.getMe);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:userId', userCtrl.delete);
router.put('/:userId', auth, userCtrl.update);

module.exports = router;
