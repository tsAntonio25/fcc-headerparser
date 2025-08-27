// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// get ip address
app.use((req, res, next) => {
  // get ip
  let myIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  
  // ip localhost
  if (myIp === '::1') {
    myIp = '127.0.0.1'
  }

  // return myIp
  req.myIp = myIp
    next();
});


// who am i api
app.get('/api/whoami', (req, res) => {
  // vars
  let language = navigator.language
  let software = navigator.userAgent
  res.json({ ipaddress: req.myIp, language: language, software: software });
  // return ip address (sscaryyy), language, software

})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
