var express = require('express')
var router = express.Router()
var multiparty = require('multiparty')
var fs = require('fs')
var Jimp = require("jimp")
var imageProcessing = require('./imageProcessing')

router.post('/upload', function(req, res, next){
  var form = new multiparty.Form({uploadDir: './uploads'})

  form.parse(req, function(err, fields, files) {
    if(err) res.status(500).json({error:err})
    else{
      var fileparts = files.file ? files.file[0].path.split('\\') : files.files[0].path.split('\\')
      var filename = fileparts[fileparts.length-1]
      var id = filename.split('.')[0]
      imageProcessing.resizeImage(filename, id, function(err, imageDetails){
        if(err)
          res.status(500).json({error:err})
        res.json(imageDetails)
      })
    }
  })
})

router.post('/apply-filter/:image/:filter', function(req, res, next){
  var id = req.params.image
  var filter = req.params.filter
  imageProcessing.applyFilter(id, filter, function(err, image){
    if(err) res.status(500).json(err)
    res.json(image)
  })
})

router.post('/generate', function(req, res, next) {
  res.json({});
})

module.exports = router;
