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
  User.findOne({username: req.params.username})
    .exec(function(err, user) {
      let pubcrawl = user.pubcrawls.id(req.params.id);
      console.log(pubcrawl);
      res.render('pubcrawls/show', {
        title: pubcrawl.name,
        pubcrawl: pubcrawl,
        formattedTime: pubcrawl.when.toLocaleString(),
        username: req.params.username,
        isAuthenticated: req.isAuthenticated(),
        isOwner: req.user && (req.user.username === req.params.username)
      });
    });
});

router.get('/:id/edit', function(req, res) {
  if(req.user && (req.params.username === req.user.username)) {
    User.findOne({username: req.params.username})
      .exec(function(err, user) {
        let pubcrawl = user.pubcrawls.id(req.params.id);
        res.render('pubcrawls/edit.hbs', {
          title: pubcrawl.name,
          pubcrawl: pubcrawl,
          when: pubcrawl.when.toLocaleString(),
          date: `${pubcrawl.when.getFullYear()}-${pubcrawl.when.getMonth()}-${pubcrawl.when.getMinutes()}`,
          bars: user.favoriteBars,
          username: req.params.username,
          isAuthenticated: req.isAuthenticated()
        });
      });
  } else {
    res.redirect('/login')
  }
});

router.post('/', function(req, res) {
  if(req.user && (req.params.username === req.user.username)) {
    User.findOne({username: req.params.username})
      .exec(function(err, user) {
        let pubcrawl = new Pubcrawl()

        pubcrawl.name = req.body.name;
        pubcrawl.theme = req.body.theme;
        pubcrawl.when = new Date(req.body.date + ' ' + req.body.time);
        pubcrawl.startBar = user.favoriteBars.id(req.body.startBar)
        req.body.checkedBars.forEach(function(checkedBar) {
          pubcrawl.bars.push(user.favoriteBars.id(checkedBar));
        });
        pubcrawl.transportation = req.body.transportation;
        pubcrawl.specialInstructions = req.body.specialInstructions;

        user.pubcrawls.push(pubcrawl);
        user.save(function(err, user) {
          if (err) { console.log(err); }
          res.redirect(`/`);
        });
      });
  } else {
    res.redirect('/login');
  }
});

router.patch('/:id', function(req, res) {
  if (req.user && (req.params.username === req.user.username)) {
    User.findOne({username: req.params.username})
      .exec(function(err, user) {
        let pubcrawl = user.pubcrawls.id(req.params.id);
        pubcrawl.name = req.body.name;
        pubcrawl.theme = req.body.theme;
        pubcrawl.when = new Date(req.body.date + ' ' + req.body.time);

        pubcrawl.startBar = user.favoriteBars.id(req.body.startBar)
        req.body.checkedBars.forEach(function(checkedBar) {
          pubcrawl.bars.push(user.favoriteBars.id(checkedBar));
        });
        pubcrawl.transportation = req.body.transportation;
        pubcrawl.specialInstructions = req.body.specialInstructions;
          user.save();
          res.redirect(`/users/${req.params.username}/bars/${req.params.id}`);
      });
  } else {
    redirect('/login');
  }
});

router.delete('/:id', function(req, res) {
  if (req.user && (req.params.username === req.user.username)) {
    User.findOne({username: req.params.username})
      .exec(function(err, user) {
        user.pubcrawls.id(req.params.id).remove()
        user.save();
        res.redirect(`/`);
      });
  } else {
    res.redirect('/login');
  }
})
module.exports = router;
