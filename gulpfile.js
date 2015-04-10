var gulp = require('gulp');

var watchify = require('watchify');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');


var path = {
  JS: './react/main.jsx',
  MINIFIED_OUT: 'bundle.js',
  DEST: 'public/javascripts'
};

var b = browserify({
  entries: path.JS,
  debug: true,
  // defining transforms here will avoid crashing your stream
  transform: [reactify]
});

var w = watchify(b);

gulp.task('default', bundle);
w.on('update', bundle); // on any dep update, runs the bundler
w.on('log', gutil.log); // output build logs to terminal

function bundle() {
    return w.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    // Add transformation tasks to the pipeline here.
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.DEST));
}

