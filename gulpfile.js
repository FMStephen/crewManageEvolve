var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var sourcemaps = require('gulp-sourcemaps')
var location = ['js/app.js',
				'js/plugin.js',
				'js/routers/**/*.js',
				'js/services/**/*.js',
				'js/directives/**/*.js']

var lib = ['lib/angular.min.js',
			    'lib/angular-ui-router.min.js',
			    'lib/angular-cookies.min.js',
			    'dist/aes.min.js']

var aes = ['lib/gibberish-aes.js',
			'lib/md5.js']

var inject = ['dist/bundle.inject.js']


gulp.task('default', function () {
	gulp.src(location)
//	gulp.src(lib)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(concat('bundle.js'))
		.pipe(sourcemaps.write('./'))
//		.pipe(uglify().on('error', function(e) { console.log('\x07',e.message); return this.end(); }))
//		.pipe(rename({ basename: 'lib.min' }))
		.pipe(gulp.dest('dist/'))
})

gulp.task('watch', function (){
	gulp.watch(location, ['default']);
})