const express = require('express')
const router = express.Router({mergeParams: true});

const User = require('../models/user.js');

router.get('/new', function(req, res) {
  if(req.user && (req.params.username === req.user.username)) {
    User.findOne({username: req.params.username})
      .exec(function(err, user) {
        res.render('pubcrawls/new', {
          bars: user.favoriteBars,
          isAuthenticated: req.isAuthenticated()
        })
      });
  } else {
    res.redirect('/login')
  }
});

module.exports = router;
