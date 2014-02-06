module.exports = function( grunt ) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    uglify: {
      main: {
        src: 'backbone.wreqr-radio.js',
        dest: 'backbone.wreqr-radio.min.js'
      }
    },

    jshint: {
      main: {
        src: 'backbone.wreqr-radio.js'
      },
      // tests: {
      //   options: {

      //   },
      //   src: [ 'tests/spec/**/*.js' ]
      // }
    },

    // Starts a server for running tests in the browser
    connect: {
      mocha: {
        options: {
          base: [ './', 'tests' ],
          debug: true,
          open: true,
          keepalive: true
        }
      }
    },

    blanket_mocha : {    
      test: {
        src: ['tests/index.html'],                
        options: {    
          threshold: 50,
          globalThreshold: 65,
          log: true,
          logErrors: true
        }                
      }
          
      }

  });

  grunt.registerTask( 'browser-test', [ 'connect' ] );
  grunt.registerTask( 'test', [ 'jshint', 'blanket_mocha' ] );
  grunt.registerTask( 'default', [ 'jshint', 'mocha', 'uglify' ] );

};