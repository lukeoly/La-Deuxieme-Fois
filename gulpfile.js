var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var gulp        = require('gulp');
var sass        = require('gulp-sass');
var plumber     = require('gulp-plumber');
var coffee      = require('gulp-coffee');
var concat      = require('gulp-concat-util');
var uglify      = require('gulp-uglify');
var gutil       = require('gulp-util');




gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./dist/"
    }
  });
});


// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function () {
  return gulp.src('scss/**/*.scss')
    // .pipe(plumber())
    // .pipe(coffee())
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({stream:true}));
});

// Reload all Browsers
gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('copyJS', function() {
   gulp.src([
     './node_modules/jquery/dist/jquery.min.js',
     './node_modules/popper.js/src/popper.min.js',
     './node_modules/bootstrap/dist/js/bootstrap.min.js',
     './node_modules/slick-carousel/slick/slick.min.js',
     './js/slick.init.js'
   ])
   .pipe(concat('scripts.js'))
   .pipe(uglify())
   .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
   .pipe(gulp.dest('./dist/js'));
});


// Default task to be run with `gulp`
// This default task will run BrowserSync & then use Gulp to watch files.
// When a file is changed, an event is emitted to BrowserSync with the filepath.
gulp.task('default',  ['browser-sync', 'copyJS'], function () {
  gulp.watch('dist/css/*.css', function (file) {
    if (file.type === "changed") {
      reload(file.path);
    }
  });
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch("*.html", ['bs-reload']);
});
