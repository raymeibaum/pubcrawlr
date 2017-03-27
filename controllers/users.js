const express = require('express');
const router = express.Router({mergeParams: true});

const User = require('../models/user.js');
const auth = require('../helpers/auth.js');
const bcrypt = require('bcrypt');

router.get('/', function(req, res) {
  User.findOne({username: req.params.username})
    .exec(function(err, user) {
      if (!user) {
        res.render('errors/404.hbs')
      } else {
        res.render('users/show.hbs', {
          title: user.username,
          username: user.username,
          bars: user.favoriteBars,
          isAuthenticated: req.isAuthenticated(),
        });
      }
    });
});

router.get('/edit', function(req, res) {
  res.render('users/edit.hbs', {
    title: req.user.username,
    username: req.user.username,
    isAuthenticated: req.isAuthenticated(),
    message: req.flash('error')
  });
});

router.patch('/', function(req, res) {
  if (req.body.password === req.body.confirmPassword) {
    if (req.isAuthenticated() && req.user.username === req.params.username) {
      User.findOneAndUpdate({username: req.params.username}, {
        passwordDigest: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
      }, {new: true})
      .exec(function(err, user) {
        if (err) { console.log(err); }
        res.redirect(`/users/${req.params.username}`);
      })
    }
  } else {
    req.flash('error', "Passwords don't match.");
    res.redirect(`/users/${req.params.username}/edit`);
  }

});

router.delete('/', auth.authorize, function(req, res) {
  User.findByIdAndRemove(req.params.id)
    .exec(function(err) {
      res.redirect('/signup');
    });
});

module.exports = router;
