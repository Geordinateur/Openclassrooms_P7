const express = require('express');
const router = express.Router();
const gifCtrl = require('../controllers/gif');

router.get('/', gifCtrl.getAll);
router.post('/', gifCtrl.create);
router.delete('/:id', gifCtrl.delete);

module.exports = router;
