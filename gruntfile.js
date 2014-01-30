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

    mocha: {
      options: {
        run: true
      },
      main: {
        src: [ 'tests/**/*.html' ]
      }
    }

  });

  grunt.registerTask( 'test', [ 'jshint', 'mocha' ] );
  grunt.registerTask( 'default', [ 'jshint', 'mocha', 'uglify' ] );

};