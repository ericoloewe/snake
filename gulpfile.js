var gulp = require("gulp");
var tsc = require("gulp-typescript");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task("default", ["compiler", "compress"]);

gulp.task("compiler", function() {
    var tsconfig = tsc.createProject("tsconfig.json");
    return gulp.src([
                    "Content/**/*.ts",                    
                    ])
                .pipe(tsc(tsconfig))
                .pipe(gulp.dest("Content/lib"));
});

gulp.task("compress", function() {
    return gulp.src([
                    "Content/lib/Model/*.js",
                    "Content/lib/**/*.js",
                    ])
        .pipe(concat("main.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(""));
});

gulp.task("watch", function() {
    return gulp.watch("**/*.ts", ["compiler"]);
})