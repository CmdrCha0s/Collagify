var express = require('express')
var bodyParser = require('body-parser')
var sassMiddleware = require('node-sass-middleware')
var path = require('path')
var app = express()
var API = require('./API/api')

var sassOptions = {
    src: path.join(__dirname, 'UI/style'),
    dest: path.join(__dirname, 'Public/css'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}

app.set('port', (process.env.PORT || 3333))
app.set('views', __dirname + '/Views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/Public'))
app.use(express.static(__dirname + '/Uploads'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(sassMiddleware(sassOptions))
app.use('/api', API)
app.use('/', function(req, res, next) {
  res.render("collagify");
})
app.use(function(req, res, next){
  if(req.xhr){
    res.status(404).json("Route not found")
  }
  else {
    res.status(404).render('404')
  }
})

app.listen(app.get('port'))
