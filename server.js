const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const logger = require('morgan');
const hbs = require('hbs')
const mongoose = require('mongoose');

const usersController = require('./controllers/users.js');
const sessionsController = require('./controllers/sessions.js');

const app = express();

// ADD THE NAME OF YOUR DATABASE
mongoose.connect('mongodb://localhost/pubcrawl-planner');

app.set('view engine', 'hbs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(methodOverride('_method'));

app.use(session({
  secret: "derpderpderpcats",
  resave: false,
  saveUninitialized: false
}));

app.use('/users', usersController);
app.use('/sessions', sessionsController);

const port = process.env.PORT || 3000
app.listen(port, console.log(`Server listening on port: ${port}.`));
