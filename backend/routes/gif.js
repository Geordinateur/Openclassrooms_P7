const express = require('express');
const router = express.Router();
const gifCtrl = require('../controllers/gif');

router.get('/', gifCtrl.getAll);
router.get('/:id', gifCtrl.getOne);
router.post('/', gifCtrl.create);
router.post('/:id', gifCtrl.modify);
router.delete('/:id', gifCtrl.delete);

module.exports = router;
