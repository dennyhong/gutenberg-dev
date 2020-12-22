const gulp = require("gulp");
const zip = require("gulp-zip");

// Bundles plugin into a zip
function bundle() {
	return gulp
		.src([
			"**/*",
			"!node_modules/**",
			"!src/**",
			"!gulpfile.js",
			"!package.json",
			"!package-lock.json",
			"!webpack.config.js",
			"!.gitignore",
			"!bundled/**",
		])
		.pipe(zip("firsttheme-blocks.zip"))
		.pipe(gulp.dest("bundled"));
}

exports.bundle = bundle;
