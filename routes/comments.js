const express = require('express');
const router = express.Router({mergeParams: true});
const commentsCtrl = require('../controllers/comments');

router.post('/comments', commentsCtrl.create);

module.exports = router;