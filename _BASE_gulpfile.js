// jshint ignore: start
'use strict';

// INCLUDES SECTION
// -------------------------------
var gulp = require('gulp');
var sass = require('gulp-sass');
// Etc.



// GLOBAL CONFIG SECTION
// -------------------------------
// Here we define which sass dirs we should process/watch and which exclude.
var sassSrcDirs = ['sass/**/*.scss', '!sass/external-libraries', '!sass/external-libraries/**'];
// Etc.



// TASK DEFINITIONS
// -------------------------------

// Compiles sass files and moves the result to dist.
gulp.task('sass', function () {
  return gulp.src(sassSrcDirs)
    .pipe(sass())
    .pipe(gulp.dest('css'));
});



// TASK CLI COMMANDS
// -------------------------------

// Build.
gulp.task('build', ['sass', 'ANOHTER-TASK']);
