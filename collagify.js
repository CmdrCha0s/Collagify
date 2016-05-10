var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var API = require('./API/api')

app.set('port', (process.env.PORT || 3333))

app.use(express.static(__dirname + '/UI'))
app.use(express.static(__dirname + '/uploads'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.set('views', __dirname + '/Views');
app.set('view engine', 'jade');

app.use('/api', API)
app.use('/', function(req, res, next) {
  res.render("collagify");
})

app.listen(app.get('port'))
