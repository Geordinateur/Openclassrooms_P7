const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


//router.post('/', commentCtrl.create);
//router.get('/:id', commentCtrl.getOne);
router.get('/', auth, admin, commentCtrl.getAll);
router.get('/:id', commentCtrl.getOne);
router.get('/gif/:id', commentCtrl.getGif);
router.get('/blog/:id', commentCtrl.getBlog);
router.post('/gif/:id', auth, commentCtrl.commentGif);
router.post('/blog/:id', auth, commentCtrl.commentBlog);
router.delete('/:id', auth, commentCtrl.delete);
router.put('/:id', commentCtrl.update);

module.exports = router;
