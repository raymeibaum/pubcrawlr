const express = require('express')
const router = express.Router({mergeParams: true});

const User = require('../models/user.js');
const Pubcrawl = require('../models/pubcrawl.js');

router.get('/new', function(req, res) {
  if(req.user && (req.params.username === req.user.username)) {
    User.findOne({username: req.params.username})
      .exec(function(err, user) {
        res.render('pubcrawls/new', {
          title: 'New Pubcrawl',
          bars: user.favoriteBars,
          username: user.username,
          isAuthenticated: req.isAuthenticated()
        })
      });
  } else {
    res.redirect('/login')
  }
});

router.get('/:id', function(req, res) {

})

router.post('/', function(req, res) {
  if(req.user && (req.params.username === req.user.username)) {
    User.findOne({username: req.params.username})
      .exec(function(err, user) {
        let pubcrawl = new Pubcrawl({
          name: req.body.name,
          theme: req.body.theme,
          date: new Date(req.body.date),
          startTime: new Date(req.body.startTime),
          startBar: req.body.startBar,
          bars: [req.body.checkedBars],
          transportation: req.body.transportation,
          specialInstructions: req.body.specialInstructions
        });
        user.pubcrawls.push(pubcrawl);
        user.save(function(err, user) {
          if (err) { console.log(err); }
          res.redirect(`/`);
        })
      })

  }
})

module.exports = router;
