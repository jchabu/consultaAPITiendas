var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const {src, task} = require('gulp');

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



//Watcher
gulp.task('watch', function () {
    gulp.watch('sass/**/*.sass', gulp.series(['sass']));
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("./js/*.js").on('change', browserSync.reload);
})

//Default task starts with gulp on console
gulp.task('default', gulp.series(['serve', 'watch']));  
