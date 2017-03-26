const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const auth = require('../helpers/auth.js')

router.get('/:id', auth.authorize, function(req, res) {
  res.render('users/show.hbs', {
    title: req.session.currentUser.username,
    username: req.session.currentUser.username,
    id: req.session.currentUser._id
  });
});

router.get('/:id/edit', auth.authorize, function(req, res) {
  res.render('users/edit.hbs', {
    title: req.session.currentUser.username,
    username: req.session.currentUser.username,
    id: req.session.currentUser._id
  });
});

router.post('/', auth.createSecure, function(req, res){
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

router.patch('/:id', auth.createSecure, function(req, res) {
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

router.delete('/:id', auth.authorize, function(req, res) {
  User.findByIdAndRemove(req.params.id)
    .exec(function(err) {
      res.redirect('/signup');
    })
})
module.exports = router;
