'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
require('dotenv').config();

var cors = require('cors');
var bodyParser = require('body-parser');

var urlHandler = require('./controllers/urlHandler.js');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;
var mongoURL = process.env.MONGOLAB_URI;

mongoose.connect(mongoURL, function(err, db){
  if (err) {
  console.log('Unable to connect to the mongoDB server. Error:', err);
} else {
  console.log('Connection established to', mongoURL);
  // do some work here with the database.=
}
}); 

app.use(cors());
app.use(bodyParser.urlencoded({'extended': false})); //mount body-parser to parse POST bodies

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

// sample API endpoint
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.post("/api/shorturl/new", urlHandler.addUrl);

app.get('/api/shorturl/:shurl', urlHandler.processShortUrl);

//handle routes not found
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not Found');
})


app.listen(port, function () {
  console.log('Node.js listening ...');
});