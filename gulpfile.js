var gulp = require('gulp');
var sass = require('gulp-sass');
var less = require('gulp-less');
var cached = require('gulp-cached');
var remember = require('gulp-remember');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var nodemon = require('gulp-nodemon');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('scss:dev', function() {
	return gulp.src('./src/scss/*.scss')
			.pipe(cached('scss'))
			.pipe(sass().on('error', sass.logError))
			.pipe(remember('scss'))
			.pipe(autoprefixer('last 2 version', 'ie >= 9'))
			.pipe(gulp.dest('./public/css/'));
});

gulp.task('scss:dev:components', function() {
	return gulp.src('./src/scss/*.scss') 
			.pipe(sass().on('error', sass.logError)) 
			.pipe(autoprefixer('last 2 version', 'ie >= 9'))
			.pipe(gulp.dest('./public/css/'));
});

gulp.task('scss:dist', function() {
	return gulp.src('./src/scss/*.scss')
			.pipe(sourcemaps.init())
			.pipe(cached('scss'))
			.pipe(sass().on('error', sass.logError))
			.pipe(remember('scss'))
			.pipe(autoprefixer('last 2 version', 'ie >= 9'))
			.pipe(sourcemaps.write())
			.pipe(minifycss())
			.pipe(rename({suffix : '.min'}))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('./public/css/'));
});

var browserSync = require('browser-sync').create();

// Static server 
gulp.task('server', function() {
	var mon = nodemon({
		script : './src/server/index.js',
		ext    : 'js',
		env    : {'NODE_ENV' : 'development'},
		ignore : ["test/*", "src/pages/*", "src/components/*"],
		watch  : ["src/server", "src/lib"],
		stderr : true,
		stdout : false
	});
	mon.on('start', function() {
		console.log('restarting server!');
	})
	mon.on('readable', function() {
		this.stdout.on("data", function(data) {
			console.log(data.toString());
			if (/server ready/.test(data)) {
				console.log('reload!');
				browserSync.reload();
			} else {
			}
		})
	});
});

gulp.task('copy-bootstrap', function() {
	return gulp.src('./node_modules/bootstrap/scss/**/*.scss')
			.pipe(gulp.dest('./src/scss/bootstrap-scss/'));
});

gulp.task('dev', ['scss:dev', 'server', 'copy-bootstrap'], function() {

	browserSync.init("./public", {
		notify         : false,
		browser        : false,// "google chrome",
		logConnections : true,
		open           : false,
		proxy          : {
			target   : 'http://localhost:5000',
			proxyReq : [
				function(proxyReq) {
					//	proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
				}
			],

			proxyRes : [
				function(res) {
					//console.log(res.headers);
				}
			]
		}


	});
	gulp.watch('./src/components/**/*.scss', ['scss:dev:components']); 
	gulp.watch('./src/scss/**/*.scss', ['scss:dev']); 
	gulp.watch("./public/*.html").on('change', browserSync.reload);
	gulp.watch("./src/_layouts/*.js").on('change', browserSync.reload);
	gulp.watch("./src/pages/**/*.js").on('change', browserSync.reload);
	gulp.watch("./src/components/**/*.js").on('change', browserSync.reload);
})
;
gulp.task('dist', ['scss:dist']);

gulp.task('default', ["dev"]);