const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const logger = require('morgan');
const hbs = require('hbs')
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');

require('dotenv').config();
require('./helpers/passport.js')(passport);

const usersController = require('./controllers/users.js');
const sessionsController = require('./controllers/sessions.js');
const barsController = require('./controllers/bars.js');

const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.set('view engine', 'hbs')
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(flash());
app.use(session({ secret: 'charliethewondermutt', resave: true, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', sessionsController(passport));
app.use('/users/:username', usersController);
app.use('/users/:username/bars', barsController);

const db = mongoose.connection;
db.on('error', function(err){
  console.log(err);
});

db.once('open', function() {
  console.log("database has been connected!");
});

const port = process.env.PORT || 3000
app.listen(port, console.log(`Server listening on port: ${port}.`));
