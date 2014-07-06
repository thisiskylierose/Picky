// Generated on 2014-05-22 using generator-webapp 0.4.9
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dist: '../',
        ftp: '/Users/kylierose/Sites/ghost/development/content/themes/soundsgood'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            js: {
                files: ['<%= config.app %>/assets/scripts/{,*/}*.js'],
                tasks: ['jshint','useminPrepare','concat','copy:tmp'],
                options: {
                    livereload: true
                }
            },
            jstest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['test:watch']
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['jshint']
            },
            compass: {
                files: ['<%= config.app %>/assets/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            styles: {
                files: ['<%= config.app %>/assets/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/{,*/}*.{html,hbs}',
                    '.tmp/assets/styles/{,*/}*.css',
                    '<%= config.app %>/assets/images/{,*/}*'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    open: false,
                    port: 9001,
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    base: '<%= config.dist %>',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            options: { force: true },
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*',
                        '!<%= config.dist %>/LICENSE',
                        '!<%= config.dist %>/README.md',
                        '!<%= config.dist %>/*.json',
                        '!<%= config.dist %>/webapp',
                        '!<%= config.dist %>/webapp/*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/assets/scripts/{,*/}*.js',
                '!<%= config.app %>/assets/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },

        // Mocha testing framework configuration options
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
                }
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        sass: {
            options: {
                loadPath: [
                    'bower_components'
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/assets/styles',
                    src: ['*.scss'],
                    dest: '.tmp/assets/styles',
                    ext: '.css'
                }]
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/assets/styles',
                    src: ['*.scss'],
                    dest: '.tmp/assets/styles',
                    ext: '.css'
                }]
            }
        },

        // Run compass task
        compass: {
            options: {
                sassDir: '<%= config.app %>/assets/styles',
                cssDir: '.tmp/assets/styles'
            },
            dist: {
                files: [{
                    outputStyle: 'compact',
                    environment: 'production',
                    noLineComments: true
                }]
            },
            server: {
                options: {
                    outputStyle: 'expanded',
                    environment: 'development',
                    noLineComments: false
                }
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/assets/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/assets/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        bowerInstall: {
            app: {
                src: ['<%= config.app %>/index.html'],
                exclude: ['bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap.js']
            },
            sass: {
                src: ['<%= config.app %>/assets/styles/{,*/}*.{scss,sass}']
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/assets/scripts/{,*/}*.js',
                        '<%= config.dist %>/assets/styles/{,*/}*.css',
                        '<%= config.dist %>/assets/images/{,*/}*.*',
                        '<%= config.dist %>/assets/styles/fonts/{,*/}*.*',
                        '<%= config.dist %>/*.{ico,png}'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/assets/images']
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/assets/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/assets/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/assets/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/assets/images',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/assets/images'
                }]
            }
        },

        //htmlmin: {
        //    dist: {
        //        options: {
        //            collapseBooleanAttributes: true,
        //            collapseWhitespace: true,
        //            removeAttributeQuotes: true,
        //            removeCommentsFromCDATA: true,
        //            removeEmptyAttributes: true,
        //            removeOptionalTags: true,
        //            removeRedundantAttributes: true,
        //            useShortDoctype: true
        //        },
        //        files: [{
        //            expand: true,
        //            cwd: '<%= config.dist %>',
        //            src: '{,*/}*.html',
        //            dest: '<%= config.dist %>'
        //        }]
        //    }
        //},

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //     dist: {
        //         files: {
        //             '<%= config.dist %>/assets/styles/main.css': [
        //                 '.tmp/assets/styles/{,*/}*.css',
        //                 '<%= config.app %>/assets/styles/{,*/}*.css'
        //             ]
        //         }
        //     }
        // },
        // uglify: {
        //     dist: {
        //         files: {
        //             '<%= config.dist %>/assets/scripts/scripts.js': [
        //                 '<%= config.dist %>/assets/scripts/scripts.js'
        //             ]
        //         }
        //     }
        // },
        // concat: {
        //     dist: {}
        // },

        // Copies remaining files to places other tasks can use
        copy: {
            tmp: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '.tmp/concat/assets/styles',
                    dest: '<%= config.dist %>/assets/styles/',
                    src: '{,*/}*.css'
                }, {
                    expand: true,
                    dot: true,
                    cwd: '.tmp/concat/assets/scripts',
                    dest: '<%= config.dist %>/assets/scripts/',
                    src: '{,*/}*.js'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'assets/images/{,*/}*.webp',
                        '{,*/}*.{html,hbs}',
                        'styles/fonts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    flatten: true,
                    cwd: '.',
                    src: ['bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*.*'],
                    dest: '<%= config.dist %>/assets/fonts/bootstrap'
                }, {
                    expand: true,
                    dot: true,
                    flatten: true,
                    cwd: '.',
                    src: ['bower_components/font-awesome/*.*'],
                    dest: '<%= config.dist %>/assets/fonts'
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/assets/styles',
                dest: '.tmp/assets/styles/',
                src: '{,*/}*.css'
            },
            html: {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>',
                dest: '<%= config.dist %>',
                src: [
                    '{,*/}*.['
                ]
            }
        },

        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            dist: {
                devFile: 'bower_components/modernizr/modernizr.js',
                outputFile: '<%= config.dist %>/assets/scripts/vendor/modernizr.js',
                files: {
                    src: [
                        '<%= config.dist %>/assets/scripts/{,*/}*.js',
                        '<%= config.dist %>/assets/styles/{,*/}*.css',
                        '!<%= config.dist %>/assets/scripts/vendor/*'
                    ]
                },
                uglify: true
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'compass:server',
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'compass',
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },

        // FTP tasks
        'ftp-deploy': {
            dev: {
                auth: {
                    host: 'ftp.welikethatsound.com',
                    port: 21,
                    authKey: 'weliketh'
                },
                src: '<%= config.ftp %>',
                dest: '/public_html/dev',
                exclusions: [
                    '<%= config.ftp %>/**/.DS_Store',
                    '<%= config.ftp %>/**/Thumbs.db',
                    '<%= config.ftp %>/**/.git*',
                    '<%= config.ftp %>/webapp'
                ]
            }
        }
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    grunt.registerTask('test', function (target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'concurrent:test',
                'autoprefixer'
            ]);
        }

        grunt.task.run([
            'connect:test',
            'mocha'
        ]);
    });

    grunt.registerTask('dev', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'copy:tmp',
        'copy:dist',
        'modernizr',
        'usemin'
    ]);

    grunt.registerTask('local', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'copy:tmp',
        'copy:dist',
        'modernizr',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'modernizr',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('deploy', [
        'ftp-deploy'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
