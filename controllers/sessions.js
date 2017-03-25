const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const authHelpers = require('../helpers/auth.js');

router.get('/', function(req, res) {
  if (req.session.currentUser) {
    res.redirect(`/users/${req.session.currentUser._id}`)
  } else {
    res.redirect('/login');
  }
});

router.get('/login', function(req, res) {
  res.render('sessions/login.hbs', {
    title: 'Log in'
  });
});

router.get('/signup', function(req, res) {
  res.render('sessions/signup.hbs', {
    title: 'Sign up'
  });
});

router.post('/login', authHelpers.loginUser, function(req, res){
});

router.delete('/', function(req, res){
});

module.exports = router;
