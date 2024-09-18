const express = require('express');
const router = express.Router();

const authCtrl = require('../handlers/authHandle');

router.post('/signup', authCtrl.signup);
router.post('/home', authCtrl.login);

module.exports = router;