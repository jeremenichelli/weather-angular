var gulp = require('gulp'),
	$ = require('gulp-load-plugins')();


// FLAGS
var flags = $.util.env;

// PATHS
var paths = {
	src: {
		app: [
			'node_modules/angular/angular.js',
			'node_modules/angular-route/angular-route.js',
			'src/app/app.js',
			'src/app/filters/*.js',
			'src/app/services/*.js',
			'src/app/controllers/*.js'
		]
	},
	output: {
		app: 'assets/scripts/'
	}
};

gulp.task('build:app', function() {
	return gulp.src(paths.src.app)
		.pipe($.concat('bundle.js'))
		.pipe(flags.u ? $.util.noop() : $.uglify())
		.pipe($.rename({
			basename: 'app',
			suffix: '.min'
		}))
		.pipe(gulp.dest(paths.output.app));
});
