var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    less = require('gulp-less');

gulp.task('js', function () {
  gulp.src('src/**/*.js')
  .pipe(rename('bernie-calendar.js'))
  .pipe(gulp.dest('dist/'));
});

gulp.task('js:min', function () {
  gulp.src('src/**/*.js')
  .pipe(uglify())
  .pipe(rename('bernie-calendar.min.js'))
  .pipe(gulp.dest('dist/'));
});

gulp.task('less', function () {
  gulp.src('src/**/*.less')
  .pipe(less())
  .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['js', 'js:min', 'less']);
gulp.task('default', ['build']);
gulp.task('watch', ['build'], function () {
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/**/*.less', ['less']);
});
