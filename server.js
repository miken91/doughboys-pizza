var express = require('express');
var path = require('path');
require('dotenv').config();
var app = express();
var cors = require('cors');
app.use(express.json());
app.use(cors())
var port = process.env.PORT || 8080;

app.use(require('./routes'));

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, function () {
  console.log('Application running on port: ' + port);
});