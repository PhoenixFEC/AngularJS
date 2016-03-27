var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var config = require('./config').browserSync;

gulp.task('default', function() {
	browserSync.init(config);
	browserSync.watch(config.files).on('change', browserSync.reload)
});


