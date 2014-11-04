/* global module:true */
module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        dirs: {
            js: '../assets/js',
            css: '../assets/css',
            img: '../assets/img',
            sass: '../assets/sass',
            vendor: '../assets/vendor'
        },

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: 'dist',
            sprite: [
                'dist/<%= dirs.img %>/sprite/hd',
                'dist/<%= dirs.img %>/sprite/standard'
            ],
            release: [
                'dist/<%= dirs.sass %>',
                'dist/<%= dirs.js %>/main.js',
                'dist/<%= dirs.js %>/utils.js'
            ]
        },

        concat: {
            dist: {
                src: [
                    '<%= dirs.vendor %>/jquery/dist/jquery.js',
                    '<%= dirs.vendor %>/promise-polyfill/Promise.js',
                    '<%= dirs.vendor %>/amplify/lib/amplify.js',
                    '<%= dirs.vendor %>/underscore/underscore.js',
                    '<%= dirs.vendor %>/backbone/backbone.js',
                    '<%= dirs.vendor %>/backbone.validation/dist/backbone-validation.js',
                    '<%= dirs.vendor %>/backbone.stickit/backbone.stickit.js',
                    '<%= dirs.vendor %>/cocktail/Cocktail.js',
                    '<%= dirs.vendor %>/backbone-pageable/lib/backbone-pageable.js',
                    '<%= dirs.js %>/configure.js',
                    '<%= dirs.js %>/templates.js',
                    '<%= dirs.js %>/ie-form.js',
                    '<%= dirs.js %>/ApplicationRouter.js',
                    '<%= dirs.js %>/utils.js',

                    // the final file has to be main.js
                    '<%= dirs.js %>/main.js'
                ],
                dest: '<%= dirs.js %>/scripts.js'
            }
        },

        jst: {
            compile: {
                options: {
                    //namespace: "anotherNameThanJST",      //Default: 'JST'
                    prettify: false, //Default: false|true
                    amdWrapper: false, //Default: false|true
                    templateSettings: {}
                    // processName: function(filename) {
                    //   //Shortens the file path for the template.
                    //   return filename.slice(filename.indexOf("template"), filename.length);
                    // }
                },
                files: {
                    "<%= dirs.js %>/templates.js": ["<%= dirs.js %>/**/*.tpl"]
                }
            }
        },

        uglify: {
            options: {
                mangle: true
            },
            target: {
                files: {
                    '<%= dirs.js %>/scripts.min.js': ['<%= dirs.js %>/scripts.js'],
                    '<%= dirs.js %>/modernizr.min.js': ['<%= dirs.vendor %>/modernizr/modernizr.js']
                }
            }
        },

        compass: {
            dev: {
                options: {
                    sassDir: '<%= dirs.sass %>',
                    cssDir: '<%= dirs.css %>',
                    imagesDir: '<%= dirs.img %>',
                    relativeAssets: true,
                    outputStyle: 'expanded'
                }
            },
            dist: {
                options: {
                    sassDir: 'dist/<%= dirs.sass %>',
                    cssDir: 'dist/<%= dirs.css %>',
                    imagesDir: 'dist/<%= dirs.img %>',
                    relativeAssets: true,
                    environment: 'production',
                    outputStyle: 'compressed',
                    force: true
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: '<%= dirs.sass %>/**/*',
                tasks: [
                    'compass:dev',
                    'copy',
                    // 'csscomb:dev'
                ]
            },
            js: {
                files: [
                    '<%= dirs.js %>/**/*',
                    '!<%= dirs.js %>/scripts.js',
                    '!<%= dirs.js %>/scripts.min.js',
                    '!<%= dirs.js %>/modernizr.min.js'
                ],
                tasks: [
                    'jst',
                    'concat',
                    'jshint',
                    'copy',
                ]
            },
        },

        jshint: {
            options: {
                'bitwise': true,
                'eqeqeq': true,
                'eqnull': true,
                'immed': true,
                'newcap': true,
                'esnext': true,
                'latedef': true,
                'noarg': true,
                'node': true,
                'undef': true,
                'browser': true,
                'trailing': true,
                'jquery': true,
                'curly': true,
                globals: {
                    _: true,
                    alert: true,
                    google: true,
                    Promise: true,
                    amplify: true,
                    Backbone: true,
                    console: true,
                    Cocktail: true,
                    jQuery: true,
                    FB: true,
                    JST: true,
                    SITE: true,
                    utils: true,
                }
            },
            beforeconcat: [
                '<%= dirs.js %>/*.js',
                '<%= dirs.js %>/apps/**/*.js',
                '!<%= dirs.js %>/scripts.js',
                '!<%= dirs.js %>/scripts.min.js',
                '!<%= dirs.js %>/modernizr.min.js',
                '!<%= dirs.js %>/templates.js'
            ]
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '../assets/',
                    src: ['css/**', 'fonts/**', 'img/**', 'js/scripts.js', 'js/scripts.min.js', 'js/modernizr.min.js'],
                    dest: '../../static/core/'
                }]
            }
        },

        // imagemin: {
        //   dist: {
        //     files: [{
        //       expand: true,
        //       cwd: 'dist/<%= dirs.img %>',
        //       src: ['**/*.{png,jpg,gif}'],
        //       dest: 'dist/<%= dirs.img %>'
        //     }]
        //   }
        // },

        imageoptim: {
            options: {
                quitAfter: true
            },
            png: {
                options: {
                    jpegMini: false,
                    imageAlpha: true
                },
                src: ['dist/<%= dirs.img %>/**/*.png']
            },
            jpg: {
                options: {
                    jpegMini: true,
                    imageAlpha: false
                },
                src: ['dist/<%= dirs.img %>/**/*.jpg']
            }
        },

        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    livereload: true,
                    base: 'src',
                    open: true
                }
            }
        }

    });

    grunt.registerTask('default', [ /*'connect',*/ 'watch']);

    grunt.registerTask('deploy', ['jst', 'concat', 'uglify', 'copy' ]);


    grunt.registerTask('build', [
        'clean:dist',
        'copy',
        'compass:dist',
        'csscomb:dist',
        'clean:sprite',
        // 'imagemin',
        // 'imageoptim',
        'concat',
        'uglify',
        'clean:release'
    ]);

};
