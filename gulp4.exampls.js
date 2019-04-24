const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const settings = {
  // Where SASS files are and which exclusions you want.
  sassSrcFiles: ['resources/assets/scss/**/*.scss'],
  sassDestFiles: 'public/css',
  // Assets.
  assetsToCopy: ['resources/assets/*images/**/*', 'resources/assets/*fonts/**/*'],
  assetsWatchPattern: ['resources/assets/images/**/*', 'resources/assets/fonts/**/*'],
  assetsDestDir: 'public'
};

/**
 * Compiles SASS files.
 */
const sassTask = () => {
  return gulp.src(settings.sassSrcFiles)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(settings.sassDestFiles));
};

/**
 * Copy assets.
 */
const copyAssetsTask = () => {
  return gulp.src(settings.assetsToCopy)
    .pipe(gulp.dest(settings.assetsDestDir));
};

/**
 * Build task.
 */
let buildTask = gulp.series(
  sassTask,
  copyAssetsTask
);

/**
 * Watcher.
 */
function watcherTask() {
  buildTask();
  gulp.watch(settings.sassSrcFiles, sassTask);
  gulp.watch(settings.assetsWatchPattern, copyAssetsTask);
}


exports.build = buildTask;
exports.watch = watcherTask;
