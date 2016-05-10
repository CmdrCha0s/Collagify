var Jimp = require("jimp");


Jimp.read("./tests/test.png", function (err, image) {
    if (err) throw err;
    image.greyscale()
         .write("./tests/test-gs.png");
});

Jimp.read("./tests/test.png", function (err, image) {
    if (err) throw err;
    image.invert()
         .write("./tests/test-invert.png");
});

Jimp.read("./tests/test.png", function (err, image) {
    if (err) throw err;
    image.color([
          {  apply: 'saturate', params: [ 15 ] }
         ])
         .posterize(10)
         .write("./tests/test-posterize.png");
});

Jimp.read("./tests/test.png", function (err, image) {
    if (err) throw err;
    image.color([
          { apply: 'lighten', params: [ 10 ] },
          { apply: 'saturate', params: [ 15 ] },
          { apply: 'green', params: [ 10 ] },
          { apply: 'blue', params: [ 10 ] }
         ])
         .write("./tests/test-vibrant.png");
});

Jimp.read("./tests/test.png", function (err, image) {
    if (err) throw err;
    image.sepia()
         .color([
           { apply: 'saturate', params: [ 10 ] }
         ])
         .write("./tests/test-sepea.png");
});

Jimp.read("./tests/test.png", function (err, image) {
    if (err) throw err;
    image.sepia()

         .write("./tests/test-vintage.png");
});
