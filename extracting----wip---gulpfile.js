// jshint ignore: start
'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var sassGlob = require('gulp-sass-glob');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

// Some configs:

// Here we define which sass dirs we should process/watch and which exclude.
var sassSrcDirs = ['sass/**/*.scss', '!sass/external-libraries', '!sass/external-libraries/**'];
// Here we define which external sass dirs we should process.
// Externals are sass frameworks that only needs to be compiled once.
var sassExternalsSrcDirs = 'sass/external-libraries/external-libraries.scss';
// Here we define which js dirs we should process/watch and which exclude.
var jsSrcDirs = ['js/**/*.js', '!js/**/*.min.js'];

// Generates a minified version for each theme's js file.
gulp.task('scripts', function () {
  gulp.src(jsSrcDirs)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('sourcemaps'))
    .pipe(gulp.dest('js'))
});

// Compiles sass files and moves the result to dist.
gulp.task('sass', function () {
  return gulp.src(sassSrcDirs)
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: ['./node_modules/breakpoint-sass/stylesheets']
    }).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'));
});

// Compiles external sass files and moves the result to dist.
gulp.task('sass-externals', function () {
  return gulp.src(sassExternalsSrcDirs)
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'));
});

// -------------------------------------------------

// Build.
gulp.task('build', ['sass', 'scripts']);

gulp.task('build-externals', ['sass-externals']);

// Watch changes in general and detect when something relevant gets changed.
gulp.task('watch', ['build'], function () {
  var watchDirs = sassSrcDirs.concat(jsSrcDirs);
  gulp.watch(watchDirs, ['build']);
});
