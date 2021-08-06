const express = require('express');
const router = express.Router();
const blogCtrl = require('../controllers/blog');
const auth = require('../middleware/auth');

router.get('/', blogCtrl.getAll);
router.get('/:id', blogCtrl.getOne);
router.post('/', blogCtrl.create);
router.post('/:id', blogCtrl.update);
router.delete('/:id', blogCtrl.delete);

module.exports = router;
