const express = require('express');
const router = express.Router();
const userAuthorizationController = require('../controllers/userAuthorizationController')

router.get('/session', userAuthorizationController.getSession)
router.post('/id/token', userAuthorizationController.postIdToken);
router.post('/session/token', userAuthorizationController.postSessionToken);
router.post('/access/token', userAuthorizationController.postAccessToken)
router.delete('/session', userAuthorizationController.deleteSession)

module.exports = router