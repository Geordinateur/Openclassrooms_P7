const express = require('express');
const router = express.Router();
const gifCtrl = require('../controllers/gif');
const auth = require('../middleware/auth');

router.get('/', gifCtrl.getAll);
router.get('/:id', gifCtrl.getOne);
router.post('/', auth, gifCtrl.create);
router.post('/:id', auth, gifCtrl.update);
router.delete('/:id', auth, gifCtrl.delete);
router.put('/:id', gifCtrl.update);

module.exports = router;
