var fs = require("fs")
var browserify = require("browserify")
var babelify = require("babelify")

browserify({ debug: true })
  .transform(babelify, {presets: ["es2015", "react"]})
  .require("UI/script/Includes.js", { entry: true })
  .require("UI/script/CollageImage.js", { entry: true })
  .require("UI/script/Menu.js", { entry: true })
  .require("UI/script/Collagify.js", { entry: true })
  .bundle()
  .on("error", function (err) { console.log("Error: " + err.message) })
  .pipe(fs.createWriteStream("Public/script/main.js"));
