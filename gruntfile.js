module.exports = function( grunt ) {

  grunt.initConfig({

    uglify: {
      main: {
        src: 'backbone.wreqr-channel.js',
        dest: 'backbone.wreqr-channel.min.js'
      }
    },

    jshint: {
      main: {
        src: 'backbone.wreqr-channel.js'
      },
      tests: {
        options: {

        },
        // src: [ 'tests/spec/**/*.js' ]
      }
    },

    mocha: {
      options: {
        run: true
      },
      main: {
        src: [ 'tests/**/*.html' ]
      }
    }

  });

  var node_modules = [
    'grunt-contrib-jshint',
    'grunt-contrib-uglify',
    'grunt-mocha'
  ];

  node_modules.forEach(function(module) {
    grunt.loadNpmTasks(module);
  });

  grunt.registerTask( 'test', [ 'jshint', 'mocha' ] );
  grunt.registerTask( 'default', [ 'jshint', 'mocha', 'uglify' ] );

};