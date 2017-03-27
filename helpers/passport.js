const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use('signup', new LocalStrategy({ passReqToCallback: true },
function(req, username, password, done) {
  if (req.body.password !== req.body.confirmPassword) {
    return done(null, false, { message: "Passwords don't match."});
  }
  User.findOne({ username: username })
    .exec(function(err, user) {
      if (err) { return done(err); }
      if (user) {
        return done(null, false, { message: 'A user exists with that username.' });
      } else {
        let newUser = new User({
          username: username,
          passwordDigest: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        });
        newUser.save(function(err, user) {
          if (err) { return done(err); }
          return done(null, user);
        });
      }
    })
  }
));

passport.use('login', new LocalStrategy({ passReqToCallback: true },
function(req, username, password, done) {
  User.findOne({ username: username })
    .exec(function(err, user) {
      if (err) { return done(err); }
      if (!user || !bcrypt.compareSync(password, user.passwordDigest)) {
        return done(null, false, { message: 'Incorrect username or password.' })
      } else {
        return done(null, user);
      }
    })
  }
));

}
