var gulp = require('gulp');
var browserSync = require('browser-sync');
var exec = require('gulp-exec');
var serverFactory = require('spa-server');

// browserSync.init({
// 	server: "./"
// });
// browserSync.stream();

// gulp.task('webserver', function() {
// 	exec('node app.js', function(err, out, err) {
// 		if(err) {
// 			console.log(err);
// 		} else {
// 			console.log(out);
// 		}
// 	});
//
// });

gulp.task('webserver', function () {
  var server = serverFactory.create({
    path: './public/index.html',
    port: 80,
    fallback: fallbackConfig
  });

  server.start();
});

gulp.task('default', ['webserver']);

// gulp.task('watcher', function() {
// 	gulp.watch('sass/**/*.scss', ['styles']);
// });
