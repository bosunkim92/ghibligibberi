const express = require('express');
const router = express.Router({mergeParams: true});
const commentsCtrl = require('../controllers/comments');

router.post('/comments', commentsCtrl.create);
//router.put('/comments/:id', commentsCtrl.update);

module.exports = router;