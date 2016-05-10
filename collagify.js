var express = require('express')
var bodyParser = require('body-parser')

var app = express()

var API = require('./API/api')

app.use(express.static(__dirname + '/UI'))
app.use(express.static(__dirname + '/uploads'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.set('views', __dirname + '/UI');
app.set('view engine', 'jade');

app.use('/api', API)
app.use('/', function(req, res, next) {
  res.render("collagify");
})


app.listen(process.env.PORT)
