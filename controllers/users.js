const express = require('express');
const router = express.Router({mergeParams: true});

const User = require('../models/user.js');
const auth = require('../helpers/auth.js')

router.get('/', function(req, res) {
  User.findOne({username: req.params.username})
    .exec(function(err, user) {
      if (!user) {
        res.render('errors/404')
      } else {
        res.render('users/show.hbs', {
          title: user.username,
          username: user.username,
          id: user._id,
          bars: user.favoriteBars
        });
      }
    })
});

router.get('/edit', auth.authorize, function(req, res) {
  res.render('users/edit.hbs', {
    title: req.session.currentUser.username,
    username: req.session.currentUser.username,
    id: req.session.currentUser._id
  });
});

router.patch('/', auth.createSecure, function(req, res) {
  User.findOne({username: req.body.username})
    .exec(function(err, user) {
      if (!user) {
        User.findByIdAndUpdate(req.params.id, {
          username: req.body.username,
          passwordDigest: res.hashedPassword
        }, {new: true})
          .exec(function(err, user) {
            req.session.currentUser = user;
            res.redirect('/');
          });
      } else {
        //res.flash('Username taken.')
      }
    });
})

router.delete('/', auth.authorize, function(req, res) {
  User.findByIdAndRemove(req.params.id)
    .exec(function(err) {
      res.redirect('/signup');
    })
})
module.exports = router;
