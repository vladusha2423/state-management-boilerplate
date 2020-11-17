const { series, parallel, src, dest } = require("gulp");

const gulp = require("gulp"),
    // less = require("gulp-less"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,
    // autoprefixer = require("gulp-autoprefixer"),
    browserSync = require("browser-sync").create(),
    sourcemaps = require('gulp-sourcemaps');

// gulp.task("less", function () {
//     return src("./src/assets/styles/main.less")
//         .pipe(less())
//         .pipe(
//             autoprefixer({
//                 cascade: false,
//             })
//         )
//         .pipe(dest("./dist"));
// });

gulp.task("html", function () {
    return gulp.src("./src/views/*.html").pipe(gulp.dest("./dist"));
});

gulp.task("js", function () {
    return gulp.src("./client/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(rename('script.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist"));
});

// gulp.task("images", function () {
//     return gulp.src("./src/assets/images/*").pipe(gulp.dest("./dist/images"));
// });

gulp.task("serve", function () {
    browserSync.init({
        server: {
            baseDir: "dist",
        },
    });

    gulp.watch("./client/**/*.js").on("change", series("js"));
    // gulp.watch("./src/assets/styles/**/*.less").on("change", series("less"));
    gulp.watch("./client/views/index.html").on("change", series("html"));

    gulp.watch("./dist/*.js").on("change", browserSync.reload);
    // gulp.watch("./dist/main.css").on("change", browserSync.reload);
    gulp.watch("./dist/*.html").on("change", browserSync.reload);
});

// gulp.task("build", series("less", "js", "images", "html"));
gulp.task("build", series("js", "html"));

// gulp.task("default", series(parallel("html", "less", "js", "images"), "serve"));
gulp.task("default", series(parallel("html", "js"), "serve"));
