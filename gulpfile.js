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
		],
		less: [
			'src/less/app.less',
			'src/less/critical.less'
		],
		critical: 'assets/styles/critical.css',
		views: 'src/app/views/*.html',
		html: 'src/main.html',
		js: 'src/app/*.js'
	},
	output: {
		app: 'assets/scripts/',
		less: 'assets/styles/',
		views: 'views/',
		html: './'
	}
};

gulp.task('lint:app', function() {
    return gulp.src(paths.src.js)
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError());
});

gulp.task('build:app', [ 'lint:app' ], function() {
	if (flags.u) {
		$.util.log($.util.colors.yellow('(--u) script will not be minified'));
	}

	return gulp.src(paths.src.app)
		.pipe($.concat('bundle.js'))
		.pipe(flags.u ? $.util.noop() : $.uglify())
		.pipe($.rename({
			basename: 'app'
		}))
		.pipe(gulp.dest(paths.output.app));
});

gulp.task('build:less', function() {
	if (flags.u) {
		$.util.log($.util.colors.yellow('(--u) styles will not be minified'));
	}

	return gulp.src(paths.src.less)
		.pipe($.less())
		.pipe(flags.u ? $.util.noop() : $.cssnano())
		.pipe(gulp.dest(paths.output.less));
});

gulp.task('build:views', function() {
	if (flags.u) {
		$.util.log($.util.colors.yellow('(--u) views will not be minified'));
	}

	return gulp.src(paths.src.views)
		.pipe(flags.u ? $.util.noop() : $.htmlmin({
			removeComments: true,
			collapseWhitespace: true
		}))
		.pipe(gulp.dest(paths.output.views));
});

gulp.task('build:html', [ 'build:less' ], function() {
	if (flags.u) {
		$.util.log($.util.colors.yellow('(--u) html file will not be minified'));
	}

	return gulp.src(paths.src.html)
		.pipe($.inject(gulp.src(paths.src.critical), {
			transform: function () {
				// return file contents as string 
				return '<style>' + arguments[1].contents.toString('utf8') + '</style>';
		    }
		}))
		.pipe(flags.u ? $.util.noop() : $.htmlmin({
			removeComments: true,
			collapseWhitespace: true
		}))
		.pipe($.rename({
			basename: 'index'
		}))
		.pipe(gulp.dest(paths.output.html));
});

gulp.task('build', [ 'build:less', 'build:app', 'build:html', 'build:views' ]);
