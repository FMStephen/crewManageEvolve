var gulp = require('gulp')
var babel = require('gulp-babel')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')

var location = [
	'app/app.js',
	'app/plugins.js',
	'app/routers/**/*.js',
	'app/services/**/*.js',
	'app/directives/**/*.js'
];

gulp.task('default', function () {
	gulp.src(location)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(concat('bundle.js'))
		.pipe(babel({ presets: ['es2015', 'stage-0'] }))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/'))
})

gulp.task('watch', function (){
	gulp.watch(location, ['default']);
})