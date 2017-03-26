const express = require('express');
const router = express.Router({mergeParams: true});

const auth = require('../helpers/auth.js');
const User = require('../models/user.js');
const Bar = require('../models/bar.js');

router.get('/new', auth.authorize, function(req, res) {
  res.render('bars/new.hbs', {
    title: 'Add Bar',
    id: req.session.currentUser._id
  });
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
        console.log(user);
      });
      res.redirect(`/users/${req.params.userId}`);
    });
})
module.exports = router;
