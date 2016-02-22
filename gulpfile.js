var gulp = require("gulp");
var tsc = require("gulp-typescript");

gulp.task("default", ["compiler"]);

gulp.task("compiler", function() {
    var tsconfig = tsc.createProject("tsconfig.json");
    return gulp.src([
                    "!node_modules/**/*.ts",
                    "**/*.ts",                    
                    ])
                .pipe(tsc(tsconfig))
                .pipe(gulp.dest("lib"));
});

gulp.task("watch", function() {
    return gulp.watch("*.ts", ["compiler"]);
})