module.exports = function( grunt ) {

  grunt.initConfig({

    uglify: {
      main: {
        src: 'backbone.wreqr-channel.js',
        dest: 'backbone.wreqr-channel.min.js'
      }
    }

  });

  var node_modules = [
    'grunt-contrib-uglify'
  ];

  node_modules.forEach(function(module) {
    grunt.loadNpmTasks(module);
  });

  // Register tasks
  grunt.registerTask( "default", [ 'uglify' ] );

};