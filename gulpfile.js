'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const compressImages = require('compress-images');

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function () {

    // Bootstrap
    gulp.src([
        './node_modules/bootstrap/dist/**/*',
        '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
        '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
        .pipe(gulp.dest('./vendor/bootstrap'));

    // Font Awesome
    gulp.src([
        './node_modules/font-awesome/**/*',
        '!./node_modules/font-awesome/{less,less/*}',
        '!./node_modules/font-awesome/{scss,scss/*}',
        '!./node_modules/font-awesome/.*',
        '!./node_modules/font-awesome/*.{txt,json,md}'
    ])
        .pipe(gulp.dest('./vendor/font-awesome'));

    // jQuery
    gulp.src([
        './node_modules/jquery/dist/*',
        '!./node_modules/jquery/dist/core.js'
    ])
        .pipe(gulp.dest('./vendor/jquery'));

    // jQuery Easing
    gulp.src([
        './node_modules/jquery.easing/*.js'
    ])
        .pipe(gulp.dest('./vendor/jquery-easing'));

    // Magnific Popup
    gulp.src([
        './node_modules/magnific-popup/dist/*'
    ])
        .pipe(gulp.dest('./vendor/magnific-popup'));

});

// Compile SCSS
gulp.task('css:compile', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass.sync({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function () {
    return gulp.src([
        './vendor/bootstrap/css/bootstrap.css',
        './vendor/magnific-popup/magnific-popup.css',
        './vendor/fancybox/fancybox.css',
        './css/*.css',
        '!./css/*.min.css'
    ])
        .pipe(cleanCSS())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('./css'));
});

// CSS
gulp.task('css', ['css:compile', 'css:minify']);

// Minify JavaScript
gulp.task('js:minify', function () {
    return gulp.src([
        './vendor/jquery/jquery.min.js',
        './vendor/bootstrap/js/bootstrap.bundle.js',
        './vendor/jquery-easing/jquery.easing.js',
        './vendor/magnific-popup/jquery.magnific-popup.js',
        './vendor/fancybox/fancybox.js',
        './js/vendor/*.js',
        './js/custom/*.js'
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

// JS
gulp.task('js', ['js:minify']);

// Default task
gulp.task('default', ['css', 'js', 'vendor']);

// Dev task
gulp.task('dev', ['css', 'js'/*, 'browserSync'*/], function () {
    gulp.watch('./scss/*.scss', ['css']);
    gulp.watch('./js/**/*.js', ['js']);
});

gulp.task('compress_images', () => {
    compressImages(
        'img/**/*.{jpg,JPG,jpeg,JPEG,png,PNG,svg,SVG,ico,ICO,gif,GIF}',
        'build/',
        {compress_force: false, statistic: true, autoupdate: true}, false,
        {jpg: {engine: 'mozjpeg', command: ['-quality', '60']}},
        {png: {engine: 'pngquant', command: ['--quality=20-50']}},
        {svg: {engine: 'svgo', command: '--multipass'}},
        {gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}},
        (err) => {
        }
    );
});