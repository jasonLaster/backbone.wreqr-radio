module.exports = function( grunt ) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON( './package.json' ),

    meta: {
      version: '<%= pkg.version %>',
      banner:
        '/*\n' +
        ' * Wreqr Radio\n' +
        ' * -----------\n' +
        ' * v<%= pkg.version %>\n' +
        ' *\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> Jmeas\n' +
        ' * Distributed under the MIT license\n' +
        ' *\n' +
        ' */',
    },

    uglify: {
      main: {
        src: 'build/backbone.wreqr-radio.js',
        dest: 'build/backbone.wreqr-radio.min.js'
      }
    },

    jshint: {
      main: {
        src: 'build/backbone.wreqr-radio.js'
      }
    },

    preprocess: {
      main: {
        src: 'src/wrapper.js',
        dest: 'build/backbone.wreqr-radio.js'
      }
    },

    template: {
      options: {
        data: {
          version: '<%= meta.version %>',
          banner: '<%= meta.banner %>'
        }
      },
      main: {
        src: 'build/backbone.wreqr-radio.js',
        dest: 'build/backbone.wreqr-radio.js'
      }
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
          threshold: 100,
          globalThreshold: 100,
          log: true,
          logErrors: true
        }                
      }
    }

  });

  grunt.registerTask( 'browser-test', [ 'connect' ] );
  grunt.registerTask( 'test', [ 'jshint', 'blanket_mocha' ] );
  grunt.registerTask( 'default', [ 'preprocess', 'template', 'jshint', 'blanket_mocha', 'uglify' ] );

};