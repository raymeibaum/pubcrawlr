const bcrypt = require('bcrypt');
const User = require('../models/user.js');

function createSecure(req, res, next) {
  if (req.body.password === req.body.confirmPassword) {
    let password = req.body.password
    res.hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  } else {
    res.json({status: 400, data: "passwords do not match"});
  }
  next()
}

function loginUser(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username })
  .then(function(foundUser) {
    if (foundUser == null) {
      res.json({status: 401, data: "unauthorized"})
    } else if (bcrypt.compareSync(password, foundUser.passwordDigest)) {
      req.session.currentUser = foundUser;
    }
    next()
  })
  .catch(function(err){
    res.json({status: 500, data: err})
  });
}

function authorize(req, res, next) {
  let currentUser = req.session.currentUser;
  console.log(currentUser, currentUser._id, req.params.userId);
  if (!currentUser || currentUser._id !== req.params.userId ) {
    res.json({status: 401, data: 'unauthorized'});
  } else {
    next();
  }
};

module.exports = {
  createSecure: createSecure,
  loginUser: loginUser,
  authorize: authorize
}
