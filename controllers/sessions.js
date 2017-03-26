const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const auth = require('../helpers/auth.js');

module.exports = function(passport) {
  router.get('/', function(req, res) {
    res.send(req.user);
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

  router.post('/login', passport.authenticate('login', {
    successRedirect: `/users/`,
    failureRedirect: '/login',
    failureFlash: true
  }), function(req, res) {
    console.log('req.user:', req.user);
  });

  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  router.get('/logout', function(req, res) {
    req.logout()
    res.render('sessions/logout.hbs');
  });

  return router;
}
