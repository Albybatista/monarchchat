// require('dotenv').config(); // FIXME: not using this for now
require('./config/database');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cors = require('cors');
const logger = require('morgan');
const app = express(); // express instantiated for handling routes
const port = process.env.PORT || 3001;
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


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

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

http.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});