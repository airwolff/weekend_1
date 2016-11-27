var express =  require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var salaryInput = require('routes/salary_input.js');
var salaryOutput = require('routes/salary_output.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // needed by Angular

app.use(function(req, res, next) {
  console.log('hello from express!');
  next();
});

// Our routes
app.use('/salaryInput', salaryInput);
app.use('/salaryOutput', salaryOutput);

// Catchall route
app.get('/', function (req, res) {
  res.sendFile(path.resolve('../public/views/index.html'));
});
// static files
app.use(express.static('../public'));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('Listening on port ', app.get('port'));
});
