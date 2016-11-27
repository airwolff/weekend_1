var express =  require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var salary_input = require('./routes/salary_input.js');
var salary_output = require('./routes/salary_output.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // needed by Angular

app.use(function(req, res, next) {
  console.log('hello from express!');
  next();
});

// Our routes
app.use('/salary_input', salary_input);
app.use('/salary_output', salary_output);

// Catchall route
app.get('/', function (req, res) {
  res.sendFile(path.resolve('./public/views/index.html'));
});
// static files
app.use(express.static('./public'));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('Listening on port ', app.get('port'));
});
