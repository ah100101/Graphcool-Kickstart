const gulp = require('gulp')
const sass = require('gulp-sass')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const vueify = require('vueify')
const del = require('del')
const series = require('run-sequence')

const paths = {
  del: {
    folders: [ '../public' ]
  },
  html: {
    src: './*.html',
    dest: '../public'
  },
  scss: {
    src: './scss/**/*.scss',
    dest: '../public/css'
  },
  assets: {
    src: './assets/**/*',
    dest: '../public/assets'
  },
  scripts: {
    src: './js/main.js',
    dest: '../public/js',
    name: 'main.js'
  }
}

// HTML
gulp.task('html', () =>
  gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
)

gulp.task('html:watch', ['html'], () =>
  gulp.watch(paths.html.src, ['html'])
)

// Assets
gulp.task('assets', () =>
gulp.src(paths.assets.src)
  .pipe(gulp.dest(paths.assets.dest))
)

gulp.task('assets:watch', ['assets'], () =>
  gulp.watch(paths.assets.src, ['assets'])
)

// SCSS
gulp.task('scss', () =>
  gulp.src(paths.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.scss.dest))
)

gulp.task('scss:watch', ['scss'], () =>
  gulp.watch(paths.scss.src, ['scss'])
)

// Javascript
gulp.task('scripts', () => {
  return browserify(paths.scripts.src)
    .transform(vueify)
    .bundle()
    .pipe(source(paths.scripts.name))
    .pipe(gulp.dest(paths.scripts.dest))
})

gulp.task('scripts:watch', ['scripts'], () =>
  gulp.watch(paths.scripts.src, ['scripts'])
)

// Clean
gulp.task('clean', () => del(paths.del.folders, {force: true}))

// Builds
gulp.task('build', ['html', 'assets', 'scss', 'scripts'])
gulp.task('watch', ['html:watch', 'assets:watch', 'scss:watch', 'scripts:watch'])

gulp.task('dev', (done) => series('clean', 'watch', done))
gulp.task('default', (done) => series('clean', 'build', done))
