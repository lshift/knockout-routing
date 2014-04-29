module.exports = function(grunt) {

  // Load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      options: {
        port: 9001,
        livereload: true,
        base: 'src/',
        keepalive: false
      },
      dev: {},
      // Demo server accessible externally - useful e.g. for testing on iPad.
      demo: {
        options: {
          hostname: '*'
        }
      }
    },

    watch: {
      options: {
        cwd: 'src/',
        spawn: false,
        livereload: '<%= connect.options.livereload %>',
        atBegin: false
      },
      all: {
        files: '**'
      }
    },
  });

  // Default task(s).
  grunt.registerTask('default', ['connect:dev', 'watch']);
  grunt.registerTask('demo', ['connect:demo', 'watch']);
};
