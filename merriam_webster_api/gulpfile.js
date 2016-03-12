var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var babelify = require('babelify');


gulp.task('browserify', function() {
    return browserify('javascript/main.js')
    	.transform( "babelify", {presets: ["react"]})
        .bundle()
        .pipe( source( 'javascript/bundled.js' ) )
        // we take our browserified stream and run it through
        // uglify's minifier
        .pipe( streamify( uglify() ) )
        .pipe( gulp.dest('./') );
});

gulp.watch('javascript/*', ['browserify']);

//$ npm install --save react react-dom babelify babel-preset-react
//$ browserify -t [ babelify --presets [ react ] ] main.js -o bundled.js