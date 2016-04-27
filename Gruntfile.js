module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: {
                src: ['src/**/*.js']
            }
        },
        watch: {
            js: {
                files: ['src/**/*.js'],
                tasks: ['jshint'],
            }
        },
        uglify: {
            all: {
                src: ['src/mobileSlide.js'],
                dest: 'build/mobileSlide.min.js'
            }
        },
        copy: {
            all: {
                src: ['src/mobileSlide.js'],
                dest: 'build/mobileSlide.js'
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-newer');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['jshint', 'newer:uglify:all', 'newer:copy:all']);
};
