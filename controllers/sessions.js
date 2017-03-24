const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const authHelpers = require('../helpers/auth.js');

router.get('/login', function(req, res) {
});

router.post('/login', authHelpers.loginUser, function(req, res){
});

router.delete('/', function(req, res){
});

module.exports = router;
