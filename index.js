var express = require('express');
var nodemailer = require("nodemailer");
var bodyParser = require("body-parser");
var app = express();

/*
Here we are configuring our SMTP Server details.
STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport("SMTP",{
service: "Gmail",
auth: {
user: "ssrfelter@gmail.com",
pass: "19august"
}
});

/*------------------Routing Started ------------------------*/

app.use(bodyParser.urlencoded({ extended: false }));

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