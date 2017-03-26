const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/user.js');
const auth = require('../helpers/auth.js');


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

router.post('/login', auth.loginUser, function(req, res){
  res.redirect(`/users/${req.session.currentUser._id}`);
});

router.get('/logout', function(req, res) {
  req.session.destroy();
  res.render('sessions/logout.hbs');
})

router.delete('/', function(req, res){
});

module.exports = router;
