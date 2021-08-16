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
router.put('/:id', gifCtrl.update);
router.put('/:id/like', gifCtrl.like);
router.put('/:id/dislike', gifCtrl.dislike);

module.exports = router;
