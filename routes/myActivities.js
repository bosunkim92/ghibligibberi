const express = require('express');
const router = express.Router();
const myActivitiesCtrl = require('../controllers/myActivities');

router.get('/myActivities', myActivitiesCtrl.index);

module.exports = router;