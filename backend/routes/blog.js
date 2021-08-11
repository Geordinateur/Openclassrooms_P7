const express = require('express');
const router = express.Router();

const blogCtrl = require('../controllers/blog');
const auth = require('../middleware/auth');

router.get('/', blogCtrl.getAll);
router.get('/:id', blogCtrl.getOne);
router.post('/', auth, blogCtrl.create);
router.post('/:id', auth, blogCtrl.update);
router.delete('/:id', auth, blogCtrl.delete);

module.exports = router;
