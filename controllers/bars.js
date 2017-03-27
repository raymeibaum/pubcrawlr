const express = require('express');
const router = express.Router({mergeParams: true});

const auth = require('../helpers/auth.js');
const User = require('../models/user.js');
const Bar = require('../models/bar.js');

router.get('/new', function(req, res) {
  if(req.isAuthenticated()) {
    res.render('bars/new.hbs', {
      title: 'Add Bar',
      username: req.user.username
    });
  } else {
    res.redirect('/login');
  }

});

router.post('/', auth.authorize, function(req, res) {
  User.findById(req.params.userId)
    .exec(function(err, user) {
      const bar = new Bar({
        name: req.body.name,
        address: {
          street: req.body.street,
          city: req.body.city,
          state: req.body.state
        }
      });
      user.favoriteBars.push(bar);
      user.save(function(err, user) {
      });
      res.redirect(`/users/${req.params.userId}`);
    });
});

router.get('/:id', function(req, res) {
  User.findOne({username: req.params.username})
    .exec(function(err, user) {
      const bar = user.favoriteBars.id(req.params.id);
      console.log(bar);
      res.render('bars/show.hbs', {
        title: bar.name,
        bar: bar,
        username: req.params.username,
        isAuthenticated: req.isAuthenticated(),
        isOwner: req.user && (req.user.username === req.params.username)
      });
    });
});

router.get('/:id/edit', function(req, res) {
  if (req.user && (req.params.username === req.user.username)) {
    User.findOne({username: req.params.username})
      .exec(function(err, user) {
        const bar = user.favoriteBars.id(req.params.id);
        console.log(bar);
        res.render('bars/edit.hbs', {
          title: bar.name,
          bar: bar,
          username: req.params.username
        });
      });
  } else {
    res.redirect('/login');
  }
});

router.patch('/:id', auth.authorize, function(req, res) {
  User.findById(req.params.userId)
    .exec(function(err, user) {
      const bar = user.favoriteBars.id(req.params.id);
        bar.name = req.body.name;
        bar.address.street = req.body.street;
        bar.address.city = req.body.city;
        bar.address.state = req.body.state;
        user.save();
        res.redirect(`/users/${req.params.userId}/bars/${req.params.id}`);
    });
});

router.delete('/:id', auth.authorize, function(req, res) {
  User.findById(req.params.userId)
    .exec(function(err, user) {
      user.favoriteBars.id(req.params.id).remove()
      user.save();
      res.redirect(`/users/${req.params.userId}`);
    });
})

module.exports = router;
