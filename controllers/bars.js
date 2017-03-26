const express = require('express');
const router = express.Router({mergeParams: true});

const auth = require('../helpers/auth.js');

router.get('/new', auth.authorize, function(req, res) {
  res.render('bars/new.hbs', {
    title: 'Add Bar',
    id: req.session.currentUser._id
  });
});

router.post('/', auth.authorize, function(req, res) {
  
})
module.exports = router;
