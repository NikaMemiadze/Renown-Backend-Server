const express = require('express');
const profileController = require('../controllers/profileController')
const router = express.Router();

router.post('/deleteAccount', profileController.authenticateToken, profileController.deleteAccount);

module.exports = router;