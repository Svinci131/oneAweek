var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');

gulp.task('browserify', function() {
    return browserify('main.js')
        .bundle()
        
        .pipe( source( 'bundled.js' ) )
        // we take our browserified stream and run it through
        // uglify's minifier
        .pipe( streamify( uglify() ) )
        .pipe( gulp.dest('./') );
});

gulp.watch('*', ['browserify']);