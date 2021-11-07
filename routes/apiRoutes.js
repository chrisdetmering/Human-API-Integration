const express = require('express');
const router = express.Router();
const humanApiController = require('../controllers/humanApiController')

router.get('/clinical', humanApiController.getClinical)
router.get('/reports', humanApiController.getReports)

module.exports = router