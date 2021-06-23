const express = require('express');
const router = express.Router({mergeParams: true});
const reviewsCtrl = require('../controllers/reviews');

router.get('/', reviewsCtrl.new);
router.get('/:id', reviewsCtrl.index);
router.post('/', reviewsCtrl.create);
router.put('/:id', reviewsCtrl.update);
router.delete('/:id', reviewsCtrl.delete);

module.exports = router;