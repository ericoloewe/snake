var gulp = require("gulp");
var tsc = require("gulp-typescript");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task("default", ["compiler"]);

gulp.task("compiler", function() {
    var tsconfig = tsc.createProject("tsconfig.json");
    return gulp.src([
                    "./Content/Scripts/Model/Direction.ts",
                    "./Content/Scripts/Model/WhatIsThisTypes.ts",
                    "./Content/Scripts/Model/Pointer.ts",
                    "./Content/Scripts/Model/Score.ts",
                    "./Content/Scripts/Model/Food.ts",
                    "./Content/Scripts/Model/Snake.ts",
                    "./Content/Scripts/Model/Arena.ts",
                    "./Content/Scripts/main.ts",                    
                    ])
                .pipe(tsc(tsconfig))
                .pipe(gulp.dest("./Content/lib"))
                .pipe(concat("main.min.js"))
                .pipe(uglify())
                .pipe(gulp.dest("./"));
});

gulp.task("watch", function() {
    return gulp.watch("./Content/**/*.ts", ["compiler", "compress"]);
})