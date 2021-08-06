const express = require('express');
const router = express.Router();
const gifCtrl = require('../controllers/gif');
const auth = require('../middleware/auth');

router.get('/', auth, gifCtrl.getAll);
router.get('/:id', auth, gifCtrl.getOne);
router.post('/', auth, gifCtrl.create);
router.post('/:id', auth, gifCtrl.update);
router.delete('/:id', auth, gifCtrl.delete);

module.exports = router;
