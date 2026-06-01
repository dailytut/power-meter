const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const cleanCss = require('gulp-clean-css');
const { deleteAsync } = require('del');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
  dist: {
    base: 'dist',
    img: 'dist/img',
    fonts: 'dist/fonts',
    css: 'dist/css',
    js: 'dist/js',
    vendor: 'dist/vendor',
  },
  src: {
    base: './public',
    css: 'public/css/**/*.css',
    js: 'public/js/**/*.js',
    html: '**/*.html',
    img: 'public/img/**/*.+(png|jpg|gif|svg)',
    ejs: 'views/**/*.ejs',
    fonts: 'public/fonts/**/*.+(eot|svg|ttf|woff|woff2)',
    vendor: 'public/vendor/**/*',
    scss: 'public/scss/**/*.scss',
  },
};

function scssDev() {
  return gulp
    .src(paths.src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([require('postcss-flexbugs-fixes')]))
    .pipe(autoprefixer({ overrideBrowserslist: ['> 1%'] }))
    .pipe(sourcemaps.init())
    .pipe(cleanCss())
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(`${paths.src.base}/css`))
    .pipe(browserSync.stream({ match: '**/*.css' }));
}

function scssProd() {
  return gulp
    .src(paths.src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([require('postcss-flexbugs-fixes')]))
    .pipe(autoprefixer({ overrideBrowserslist: ['> 1%'] }))
    .pipe(gulp.dest(`${paths.dist.base}/css`));
}

function minifyCSS() {
  return gulp
    .src([`${paths.dist.css}/argon.css`])
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(`${paths.dist.base}/css`));
}

function minifyJS() {
  return gulp
    .src([`${paths.src.base}/js/argon.js`])
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(`${paths.dist.base}/js`));
}

function serve(done) {
  browserSync.init({
    files: ['public/**/*', 'views/**/*'],
    proxy: 'http://0.0.0.0:8000',
  });
  done();
}

function watch() {
  gulp.watch(paths.src.scss, scssDev);
  gulp.watch(paths.src.js, browserSync.reload);
  gulp.watch(paths.src.html, browserSync.reload);
  gulp.watch(paths.src.ejs, browserSync.reload);
}

function cleanDist() {
  return deleteAsync(paths.dist.base);
}

function copyJS() {
  return gulp.src(paths.src.js).pipe(gulp.dest(paths.dist.js));
}

function copyImages() {
  return gulp.src(paths.src.img).pipe(gulp.dest(paths.dist.img));
}

function copyFonts() {
  return gulp.src(paths.src.fonts).pipe(gulp.dest(paths.dist.fonts));
}

function copyVendor() {
  return gulp.src(paths.src.vendor).pipe(gulp.dest(paths.dist.vendor));
}

const build = gulp.series(
  cleanDist,
  scssProd,
  copyJS,
  copyImages,
  copyFonts,
  copyVendor,
  minifyJS,
  minifyCSS
);

const defaultTask = gulp.series(scssDev, serve, watch);

module.exports = {
  scssDev,
  scssProd,
  minifyCSS,
  minifyJS,
  serve,
  watch,
  cleanDist,
  copyJS,
  copyImages,
  copyFonts,
  copyVendor,
  build,
  default: defaultTask,
};
