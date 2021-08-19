const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


//router.post('/', commentCtrl.create);
//router.get('/:id', commentCtrl.getOne);
router.get('/gif/:id', commentCtrl.getGif);
router.post('/gif/:id', auth, commentCtrl.commentGif);
router.get('/blog/:id', commentCtrl.getBlog);
router.post('/blog/:id', auth, commentCtrl.commentBlog);
router.delete('/:id', commentCtrl.delete);
router.get('/', commentCtrl.getAll);
router.put('/:id', auth, commentCtrl.update);

module.exports = router;
