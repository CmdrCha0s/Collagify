var Jimp = require('jimp')

var readAndApplyFilter = function(imageid, success, failure, cb){
  Jimp.read('./uploads/' + imageid + '.jpg', function (err, image) {
      if (err) failure(err)
      else success(imageid, image, cb)
  })
}

var greyscale = function(imageid, image, cb){
  image.greyscale()
       .write('./uploads/' + imageid + '+gs.jpg', function(err){
         if(err) cb(err)
         else cb(undefined, imageid + '+gs.jpg')
       })
}


var invert = function(imageid, image, cb){
  image.invert()
       .write('./uploads/' + imageid + '+invert.jpg', function(err){
         if(err) cb(err)
         else cb(undefined, imageid + '+invert.jpg')
       })
}


var posterize = function(imageid, image, cb){
  image.color([
        {  apply: 'saturate', params: [ 15 ] }
       ])
       .posterize(10)
       .write('./uploads/' + imageid + '+posterize.jpg', function(err){
         if(err) cb(err)
         else cb(undefined, imageid + '+posterize.jpg')
       })
}


var vibrant = function(imageid, image, cb){
  image.color([
        { apply: 'lighten', params: [ 10 ] },
        { apply: 'saturate', params: [ 15 ] },
        { apply: 'green', params: [ 10 ] },
        { apply: 'blue', params: [ 10 ] }
       ])
       .write('./uploads/' + imageid + '+vibrant.jpg', function(err){
         if(err) cb(err)
         else cb(undefined, imageid + '+vibrant.jpg')
       })
}


var sepea = function(imageid, image, cb){
  image.sepia()
       .color([
         { apply: 'saturate', params: [ 10 ] }
       ])
       .write('./uploads/' + imageid + '+sepea.jpg', function(err){
         if(err) cb(err)
         else cb(undefined, imageid + '+sepea.jpg')
       })
}


var vintage = function(imageid, image, cb){
  image.sepia()
       .write('./uploads/' + imageid + '+vintage.jpg', function(err){
         if(err) cb(err)
         else cb(undefined, imageid + '+vintage.jpg')
       })
}


var applyFilter = function(imageid, filter, cb){
  var cannotReadImage = function(){
    cb("Failed to read image")
  }
  switch(filter){
    case 'greyscale':
      readAndApplyFilter(imageid, greyscale, cannotReadImage, cb)
      break
    case 'invert':
      readAndApplyFilter(imageid, invert, cannotReadImage, cb)
      break
    case 'posterize':
      readAndApplyFilter(imageid, posterize, cannotReadImage, cb)
      break
    case 'vibrant':
      readAndApplyFilter(imageid, vibrant, cannotReadImage, cb)
      break
    case 'sepea':
      readAndApplyFilter(imageid, sepea, cannotReadImage, cb)
      break
    case 'vintage':
      readAndApplyFilter(imageid, vintage, cannotReadImage, cb)
      break
    default:
      cb("Unknown filter type")
      break
  }
}

var resizeImage = function(filename, id, cb){
  Jimp.read('./uploads/' + filename, function (err, image) {
    if (err) cb(err)
    image.resize(500, Jimp.AUTO)
         .write('./uploads/' + id + '.jpg', function(err, image){
           if(err) cb(err)
           else
            cb(undefined, {src: id + '.jpg', id: id, dims: {height: image.bitmap.height / 2 , width: image.bitmap.width / 2}})
         })
  })
}

exports.applyFilter = applyFilter
exports.resizeImage = resizeImage
