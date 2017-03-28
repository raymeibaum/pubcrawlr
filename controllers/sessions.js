const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
// const auth = require('../helpers/auth.js');

module.exports = function(passport) {

  router.get('/', function(req, res) {
    if(req.user) {
      res.redirect(`/users/${req.user.username}`);
    } else {
      res.redirect('/login');
    }
  });

  router.get('/login', function(req, res) {
    res.render('sessions/login.hbs', {
      title: 'Log in',
      message: req.flash('error')
    });
  });

  router.get('/signup', function(req, res) {
    res.render('sessions/signup.hbs', {
      title: 'Sign up',
      message: req.flash('error')
    });
  });

  router.post('/login', passport.authenticate('login', {
    successRedirect: `/`,
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
    res.render('sessions/logout.hbs', {
      title: 'Log out'
    });
  });

  router.get('/settings', function(req, res) {
    if (req.user) {
      User.findOne({username: req.user.username})
        .exec(function(err, user) {
          if (!user) {
            res.render('errors/404.hbs')
          } else {
            res.redirect(`/users/${req.user.username}/edit`)
          }
        });
    } else {
      res.redirect('/login');
    }
  });

  return router;
}
