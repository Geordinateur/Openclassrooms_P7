const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');

router.post('/', commentCtrl.create);
router.get('/:id', commentCtrl.get);

module.exports = router;
