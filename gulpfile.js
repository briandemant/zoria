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
var ignore = require('gulp-ignore');
var glob = require('glob');
var gutil = require('gulp-util');
var fs = require('fs');
var path = require('path');

gulp.task('generate-component-lists', [], function(done) {
	glob("./src/components/**/*.scss", function(err, files) {
		var content = `// auto generated ${new Date()} .. please don't edit
@import "${files.join("\";\n@import \"")}";`;

		fs.writeFileSync("./src/scss/_components.scss", content)

		gutil.log('Generated', gutil.colors.blue("component scss"));
		gutil.log('     from', gutil.colors.yellow(files.map((file)=> {return path.basename(file, "-components.scss")}).join(", ")));
		glob("./src/components/**/*Component.js", function(err, files) {
			files = files.filter((file)=> {return path.basename(file)[0] != '_'})
			var content = `// auto generated ${new Date()} .. please don't edit\n`
			var list = [];
			content += files.map(function(file) {
				let name = path.basename(file, "Component.js");
				list.push(name);
				return `import { ${name} } from '.${file.replace("./src/components","")}'`
			}).join("\n")

			content += `\n\nexport default { ${list.join(", ")} }`

			fs.writeFileSync("./src/components/index.js", content);
			gutil.log('Generated', gutil.colors.blue("component index.js"));
			gutil.log('     from', gutil.colors.yellow(list.join(", ")));
			done();
		})
	})
});

// just to help when learning gulp
gulp.task('before', function() { gutil.log(gutil.colors.red("before")); });
gulp.task('long', function(done) { setTimeout(done, 5000)});
gulp.task('after', function() { gutil.log(gutil.colors.red("after")); });
gulp.task('gaah', ['generate-component-lists', 'after'], function() { gutil.log(gutil.colors.red("gaah")); });

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
		ext : 'js',
		env : {'NODE_ENV' : 'development'},
		ignore : ["test/*", "src/pages/*", "src/components/*"],
		watch : ["src/server", "src/lib"],
		stderr : false,
		stdout : false
	});
	mon.on('restart', function() {
		gutil.log(gutil.colors.blue("restart server"));
	})
	mon.on('readable', function() { 
		this.stdout.on("data", function(data) {
			if (/server ready/.test(data)) {
				browserSync.reload();
			} else {
				console.log(data.toString()); 
			}
		})
	});
});

gulp.task('copy-bootstrap', function() {
	return gulp.src('./node_modules/bootstrap/scss/**/*.scss')
		.pipe(gulp.dest('./src/scss/bootstrap-scss/'));
});

gulp.task('dev', ['scss:dev', 'server'], function() {
	browserSync.init("./public", {
		notify : true,
		browser : false,// "google chrome",
		logConnections : true,
		open : false,
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
	gulp.watch('./src/scss/**/*.scss', ['scss:dev']); 
	gulp.watch('./src/components/**/*.scss', ['scss:dev:components']); 
	gulp.watch("./public/*.html").on('change', browserSync.reload);
	gulp.watch("./src/_layouts/*.js").on('change', browserSync.reload);
	gulp.watch("./src/pages/**/*.js").on('change', browserSync.reload);
	gulp.watch("./src/components/**/*.js").on('change', browserSync.reload);
})
;
gulp.task('dist', ['scss:dist']);

gulp.task('prepare', ['generate-component-lists', "copy-bootstrap"]);
gulp.task('default', ['prepare', "dev"]);