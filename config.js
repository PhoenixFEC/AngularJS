
module.exports = {
	browserSync: {
		server: {
			baseDir: './',
			index: 'index.html'
		},
		port: 8880,
		files: [
			'css/*.css',
			'js/*.js',
			'partials/*.html',
			'*.html'
		]
	}
};