var Jimp = require('jimp')

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

exports.resizeImage = resizeImage
