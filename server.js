const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const logger = require('morgan');
const hbs = require('hbs')
const mongoose = require('mongoose');

const usersController = require('./controllers/users.js');
const sessionsController = require('./controllers/sessions.js');

const app = express();

mongoose.connect('mongodb://localhost/pubcrawlr');

app.set('view engine', 'hbs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
  secret: "charliethewonderdog",
  resave: false,
  saveUninitialized: false,
}));

app.use('/', sessionsController);
app.use('/users', usersController);

const db = mongoose.connection;
db.on('error', function(err){
  console.log(err);
});

db.once('open', function() {
  console.log("database has been connected!");
});

const port = process.env.PORT || 3000
app.listen(port, console.log(`Server listening on port: ${port}.`));
