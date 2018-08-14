// jshint ignore: start
'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var sassGlob = require('gulp-sass-glob');

// Some configs:

// Here we define which sass dirs we should process/watch and which exclude.
// In this case we firt add all .scss files, the exclude "external-libraries" dir and it sub dirs
var sassSrcDirs = ['sass/**/*.scss', '!sass/external-libraries', '!sass/external-libraries/**'];


gulp.task('sass', function () {
  return gulp.src(sassSrcDirs)
    // Enables globing file read ("**/*.scss")
    .pipe(sassGlob())
    // sourcemap start "listening"
    .pipe(sourcemaps.init())
    // Compile sass files
    .pipe(sass({
      // Explanded allow developers to get a more readable compiled code.
      // Its ok, on super tasks like "build-prod" or similar it can be compressed and packed.
      outputStyle: 'expanded',
      // Are you using some sass plugin provided via package.json?
      // If the plugin's instructions require a gulp inclusion this is the right place.
      includePaths: ['./node_modules/breakpoint-sass/stylesheets']
    }).on('error', sass.logError))
    // Finish sourcemap reading and write the output file aside the compiled css files.
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'));
});


gulp.task('build', ['sass']);

