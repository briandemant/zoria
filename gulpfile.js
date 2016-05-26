var gulp = require('gulp');
var less = require('gulp-less');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var nodemon = require('gulp-nodemon');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('less', function() {
	return gulp.src('./src/less/**/*.less')
		.pipe(sourcemaps.init())
		.pipe(less({
			paths : ['./src/less/includes']
		}))
		.pipe(autoprefixer('last 2 version', 'ie >= 9'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./public/css'))
		.pipe(minifycss())
		.pipe(rename('app.min.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./public/css/'));
});


var browserSync = require('browser-sync').create();

// Static server 
gulp.task('server', function() {
	var mon = nodemon({
		script : './src/server/index.js',
		ext : 'js',
		env : {'NODE_ENV' : 'development'},
		ignore : ["test/*", "src/pages/*", "src/components/*"],
		watch : ["src/server", "src/lib"],
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

gulp.task('dev', ['less', 'server'], function() {

	setTimeout(function() {
		browserSync.init("./public", {
				notify : false,
				browser : null,// "google chrome",
				logConnections : true,
		
				proxy : {
					target : 'http://localhost:5000',
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
	},1000)
	gulp.watch("./src/less/**/*.less", ['less']);
	gulp.watch("./public/*.html").on('change', browserSync.reload);
	gulp.watch("./src/_layouts/*.js").on('change', browserSync.reload);
	gulp.watch("./src/pages/**/*.js").on('change', browserSync.reload); 
	gulp.watch("./src/pages/**/*.js").on('change', function() {
		console.log(arguments);

	}); 
	gulp.watch("./src/components/**/*.js").on('change', browserSync.reload);
})
;


gulp.task('default', ["dev"]);