const express = require('express');
const profileController = require('../controllers/profileController');
const { authenticateToken } = require('../security/authenticateToken');
const { globalLimiter } = require('../security/rateLimiter');
const router = express.Router();

router.use(globalLimiter); 
router.use(authenticateToken); 

router.post('/deleteAccount', profileController.deleteAccount);
router.post('/changeEmail', profileController.changeEmail);
router.post('/changePassword', profileController.changePassword);
router.post('/changeName', profileController.changeName);

module.exports = router;
