var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/home', function(request, response) {
  //response.render('pages/home');
  response.sendFile(__dirname +'/public/index1.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

/*
var express = require('express');

var app = express()

var http = require('http'),

fs = require('fs');

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {

res.sendFile(__dirname + '/pages/index.html');

});

*/