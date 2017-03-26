const express = require('express');
const router = express.Router();

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

router.post('/signup', auth.createSecure, function(req, res){
  User.findOne({username: req.body.username})
    .exec(function(err, userFound) {
      if (!userFound) {
        let newUser = new User({
          username: req.body.username,
          passwordDigest: res.hashedPassword
        });
        newUser.save(function(err, newUser){
          if (err) {
            console.log(err);
          } else {
            req.session.currentUser = newUser;
            res.redirect(`/users/${newUser._id}`);
          }
        });
      } else {
        res.json({status: 200, data: 'username taken'});
      }
    });
});

router.get('/logout', function(req, res) {
  req.session.destroy();
  res.render('sessions/logout.hbs');
})

module.exports = router;
