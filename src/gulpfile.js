var gulp = require('gulp')
var sass = require('gulp-sass')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var vueify = require('vueify')

gulp.task('styles:deploy', function () {
  gulp.src('scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('../public/css/'))
})

gulp.task('scripts:deploy', function () {
  return browserify('./js/index.js')
    .transform(vueify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('../public/js/'))
})

gulp.task('scripts:watch', function () {
  gulp.watch('./js/**', ['scripts:deploy'])
})

gulp.task('styles:watch', function () {
  gulp.watch('./scss/**', ['styles:deploy'])
})

gulp.task('fire:everything', function () {
  gulp.start('scripts:deploy')
  gulp.start('styles:deploy')
})

gulp.task('watch:everything', function () {
  gulp.watch(['./scss/**', './js/**'], ['styles:deploy', 'scripts:deploy'])
})
