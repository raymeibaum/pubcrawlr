const mongoose = require('mongoose');

const User = require('../models/user');
const Bar = require('../models/bar');

// THESE BAR SEEDS ASSUME THERE IS ALREADY A USER NAMED RAY IN THE DB

mongoose.connect('mongodb://localhost/pubcrawlr');

let bar1 = new Bar({
  name: "Finn McCool's",
  address: {
    street: '3701 Banks St.',
    city: 'New Orleans',
    state: 'LA'
  }
});

let bar2 = new Bar({
  name: "Mid City Yacht Club",
  address: {
    street: '440 S St Patrick St.',
    city: 'New Orleans',
    state: 'LA'
  }
});

let bar3 = new Bar({
  name: "The Avenue Pub",
  address: {
    street: '1732 St Charles Ave',
    city: 'New Orleans',
    state: 'LA'
  }
});
 User.findOne({username: 'ray'})
  .exec(function(err, user) {
    if (err) console.log(err);
    user.favoriteBars.push(bar1, bar2, bar3);
    user.save(function(err, user) {
      if (err) console.log(err);
      console.log(user);
      mongoose.connection.close();
    });
  });
