const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const authHelpers = require('../helpers/auth.js')

router.get('/signup', function(req, res){
});

router.post('/', authHelpers.createSecure, function(req, res){
});

module.exports = router;
