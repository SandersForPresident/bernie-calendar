var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less');

gulp.task('js', function () {
  gulp.src('src/**/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist/'));
});

gulp.task('less', function () {
  gulp.src('src/**/*.less')
  .pipe(less())
  .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['js', 'less']);
gulp.task('default', ['build']);
