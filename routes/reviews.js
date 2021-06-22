const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

router.get('/movies/:id/new_review', reviewsCtrl.new);
router.post('/movies/:id/reviews', reviewsCtrl.create);

module.exports = router;