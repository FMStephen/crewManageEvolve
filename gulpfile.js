var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var sourcemaps = require('gulp-sourcemaps')
var location = [
			    'js/app.js',
			    'js/services/**/*.js',
				'js/routers/**/*.js'
				]

var lib = []


gulp.task('default', function () {
	gulp.src(location)
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('dist/'))
		.pipe(uglify().on('error', function(e) { console.log('\x07',e.message); return this.end(); }))
		.pipe(rename({ basename: 'bundle.min' }))
		.pipe(gulp.dest('dist/'))
})

gulp.task('watch', function (){
	gulp.watch(location, ['default']);
})