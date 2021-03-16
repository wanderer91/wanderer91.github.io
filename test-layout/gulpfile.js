const gulp = require('gulp');
const stylus = require('gulp-stylus');
const nunjucks = require('gulp-nunjucks');
const minifyCss = require('gulp-minify-css');
const gulpUglify = require('gulp-uglify');
const htmlMin = require('gulp-htmlmin');

const styleFiles = './src/styles/**/*.styl';
const jsFiles = './src/js/**/*.js';
const htmlFiles = './src/html/**/*.html';

gulp.task('css', () => {
    return gulp.src('./src/styles/app.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./dist'));
});

gulp.task('css:build', () => {
    return gulp.src('./src/styles/app.styl')
        .pipe(stylus({
            compress: true
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist'));
});

gulp.task('js', () => {
    return gulp.src('./src/js/main.js')
        .pipe(gulp.dest('./dist'));
});

gulp.task('js:build', () => {
    return gulp.src('./src/js/main.js')
        .pipe(gulpUglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('html', () => {
    return gulp.src('./src/html/index.html')
        .pipe(nunjucks.compile())
        .pipe(gulp.dest('./'))
});

gulp.task('html:build', () => {
    return gulp.src('./src/html/index.html')
        .pipe(nunjucks.compile())
        .pipe(htmlMin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./'))
});

gulp.task('watch', () => {
    gulp.watch(styleFiles, gulp.series(['css']));
    gulp.watch(jsFiles, gulp.series(['js']));
    gulp.watch(htmlFiles, gulp.series(['html']));
});

gulp.task('build', gulp.series(['css:build', 'js:build', 'html:build']));
