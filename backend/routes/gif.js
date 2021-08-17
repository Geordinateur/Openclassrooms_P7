const express = require('express');
const router = express.Router();
const gifCtrl = require('../controllers/gif');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', gifCtrl.getAll);
router.get('/:id', gifCtrl.getOne);
router.post('/', auth, multer, gifCtrl.create);
router.post('/:id', auth, gifCtrl.update);
router.delete('/:id', auth, gifCtrl.delete);
router.put('/:id', auth, gifCtrl.update);
router.put('/:id/like', auth, gifCtrl.like);
router.put('/:id/dislike', auth, gifCtrl.dislike);

module.exports = router;
