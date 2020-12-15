require('dotenv').config(); // FIXME: not using this for now
require('./config/database');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
// const favicon = require('serve-favicon');
const cors = require('cors');
const logger = require('morgan');
const app = express(); // express instantiated for handling routes
const port = 3001;
const http = require('http').createServer(app); // http calls required for request & response
const io = require('socket.io')(http, { // v3.x of socket.io requires cors settings for connection to be established
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
})

//socket.io on connection
io.on('connection', socket => {
  // console.log(socket); // socket object
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
  })
})
const session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const profileRouter = require('./routes/profile');

// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 3001;
// const cors = require('cors');

require('./config/database');
require('./config/passport');

// app.use(cors());
// app.use(logger('dev'));
// app.use(express.json());
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
// app.use(express.static(path.join(__dirname, 'build')));

app.use((req, res, next) => {
  const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://127.0.0.1:9000', 'http://localhost:9000'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
  }
  // res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


app.use(cors());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'build')));
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'TechMonarchs!',
  resave: false,
  saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);
app.use(function(req, res) {
  res.status(404).send('Cant find that!');
});

http.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});

