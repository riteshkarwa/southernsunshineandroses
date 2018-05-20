var express = require('express');
var nodemailer = require("nodemailer");
var bodyParser = require("body-parser");
var app = express();
var pg = require('pg');
var cors = require('cors')
var conString = process.env.DATABASE_URL || "postgres://gjdkdyoccbwtvd:t6zJ6YxmYvsXvShSi-wLVXT5es@ec2-107-21-106-196.compute-1.amazonaws.com:5432/d2lnocf9vtp4rq";
//var conString = process.env.DATABASE_URL || "postgres://localhost:5432/testdb";

/*
Here we are configuring our SMTP Server details.
STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport("SMTP",{
  service: 'Gmail',
  auth: {
    user: "ssrfelter@gmail.com",
    pass: "19august"
  }
});

console.log('SMTP Configured');

/*------------------Routing Started ------------------------*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
/*Enable CORS*/
app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

/*
app.get('/', function(request, response) {
  response.render('pages/index');
});
*/

app.get('/', function(request, response) {
  //response.render('pages/index');
  response.sendFile(__dirname +'/public/index1.html');
});

app.post('/send', function(req, res){
  console.log("in mail controller");
  var mailOptions={
    from : req.body.name + " " + req.body.email + " ",
    to : "ssrfelter@gmail.com",
    subject : req.body.subject,
    text : req.body.text
  }
  console.log(mailOptions);
  
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
      res.end("error");
    }else{
      console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });
});

/*
app.get('/home', function(request, response) {
  //response.render('pages/home');
  response.sendFile(__dirname +'/public/index1.html');
});
*/

// Query Database to get all likes
app.get('/api/all_likes', function(req, res) {
  var results=[];
  pg.connect(conString,function(err, client, done) {
      if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM num_of_likes");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});

app.put('/api/update_likes/:likes_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.likes_id;
    //console.log(id);
    // Grab data from http request
    var data = {likes: req.body.likes};
    console.log("Data "+ JSON.stringify(req.body));

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE num_of_likes SET likes=($1) WHERE id=($2);", [data.likes, id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM num_of_likes;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
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