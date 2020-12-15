// const express = require('express');
// const path = require('path');
// const favicon = require('serve-favicon');
// const logger = require('morgan');
// const app = express();
// const port = process.env.PORT || 3001;

// require('dotenv').config();
// require('./config/database');

// const cors = require('cors');


// app.use(cors());
// app.use(logger('dev'));
// app.use(express.json());
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
// app.use(express.static(path.join(__dirname, 'build')));


// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });
  
// app.listen(port, function() {
//   console.log(`Express app running on port ${port}`)
// });

const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: "https://localhost:4000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', socket => {
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
  })
})

http.listen(4000, function() {
  console.log('listening on port 4000')
})

console.log('hi im the server');