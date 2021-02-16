var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const {src, task} = require('gulp');
const jsdoc = require('gulp-jsdoc3');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("sass/**/*.sass")
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

// Static Server
gulp.task('serve', gulp.series(['sass']), function () {

    browserSync.init({
        server: "./"
    });
});

gulp.task('lint', function() {
    return gulp    
      // Define the source files
      .src('./js/*.js').pipe(eslint({}))
      // Output the results in the console
      .pipe(eslint.format())
      .pipe(browserSync.stream());
  });

gulp.task('doc', function (cb){
    gulp.src('js/*.js')
    .pipe(jsdoc(cb));
});

//Watcher
gulp.task('watch', function () {
    gulp.watch('sass/**/*.sass', gulp.series(['sass']));
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("./js/*.js").on('change', gulp.series(['lint']));
})

//Default task starts with gulp on console
gulp.task('default', gulp.series(['serve', 'watch']));  
