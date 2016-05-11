module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    "babel": {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          "Public/script/Includes.js": "UI/script/Includes.js",
          "Public/script/CollageImage.js": "UI/script/CollageImage.js",
          "Public/script/Menu.js": "UI/script/Menu.js",
          "Public/script/Collagify.js": "UI/script/Collagify.js"
        }
      }
    },
    concat: {
      options: {
        separator: ''
      },
      dist: {
        src: ['Public/script/Includes.js', 'Public/script/CollageImage.js', 'Public/script/Menu.js', 'Public/script/Collagify.js'],
        dest: 'Public/script/main.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'Public/script/main.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    clean: {
      js: ['Public/script/*.js', 'Public/script/*.js.map', '!Public/script/*.min.js']
    }
  })

  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks("grunt-contrib-clean")

  grunt.registerTask('build', ['babel', 'concat', 'uglify', 'clean'])
}
