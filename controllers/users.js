const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const authHelpers = require('../helpers/auth.js')

router.get('/:id', authHelpers.authorize, function(req, res) {
  res.render('users/show.hbs', {
    currentUser: req.session.currentUser.username
  })
})

router.post('/', authHelpers.createSecure, function(req, res){
  let user = new User({
    username: req.body.username,
    passwordDigest: res.hashedPassword
  });
  user.save(function(err, user){
    if (err) {
      console.log(err);
    } else {
      req.session.currentUser = user;
      res.redirect(`/users/${user._id}`);
    }
  });
});

module.exports = router;
