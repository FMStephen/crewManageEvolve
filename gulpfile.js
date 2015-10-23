var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var sourcemaps = require('gulp-sourcemaps')
var location = ['js/app.js',
				'js/routers/**/*.js',
				'js/services/**/*.js',
				'js/directives/**/*.js']
var lib = ['lib/angular.js',
		   'lib/angular-ui-router.js',
		   'lib/angular-cookies.js']


gulp.task('default', function () {
	gulp.src(location)
		.pipe(sourcemaps.init())
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('dist/'))
})