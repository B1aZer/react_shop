var gulp = require('gulp');

var watchify = require('watchify');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var mainBowerFiles = require('main-bower-files');

var flatten = require('gulp-flatten');
var gulpFilter = require('gulp-filter');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var mainBowerFiles = require('main-bower-files');

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

gulp.task('copy', function() {

  // Define paths variables
  var dest_path =  'public';

  var jsFilter = gulpFilter(['*.js', '*.js.map']);
  var cssFilter = gulpFilter(['*.css', '*.css.map']);
  var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);

  return gulp.src(mainBowerFiles())

  // grab vendor js files from bower_components, minify and push in /public
  .pipe(jsFilter)
  .pipe(gulp.dest(dest_path + '/javascripts/vendor'))
  .pipe(uglify())
  .pipe(rename({
    suffix: ".min"
  }))
  .pipe(gulp.dest(dest_path + '/javascripts/vendor'))
  .pipe(jsFilter.restore())

  // grab vendor css files from bower_components, minify and push in /public
  .pipe(cssFilter)
  .pipe(gulp.dest(dest_path + '/stylesheets/vendor'))
  .pipe(minifycss())
  .pipe(rename({
    suffix: ".min"
  }))
  .pipe(gulp.dest(dest_path + '/stylesheets/vendor'))
  .pipe(cssFilter.restore())

  // grab vendor font files from bower_components and push in /public 
  .pipe(fontFilter)
  .pipe(flatten())
  .pipe(gulp.dest(dest_path + '/fonts'));
});
