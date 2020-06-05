const {src, dest, series, lastRun, watch, parallel} = require("gulp");
const gulpSass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const uglifyjs = require("gulp-uglify-es").default;

function sass(){

    return src("src/*.scss")
    .pipe(gulpSass())
    .pipe(dest("dist"));
}

function clean(){

    return src('dist/*.css')
    .pipe(cleanCSS())
    .pipe(dest("dist"));
}

function imagelit(){

    return src("src/images/*",{since: lastRun(imagelit)})
    .pipe(imagemin([imagemin.mozjpeg({quality: 75, progressive: true})]))
    .pipe(dest("dist/images"));
}

function jsOpti(){

    return src("src/*.js")
    .pipe(uglifyjs())
    .pipe(dest("dist"))
}

function watcher() {
    watch('src/images/**/*.jpg', imagelit);
    watch("src/*.scss", sass)
};

module.exports = {
    sass,
    clean,
    imagelit,
    jsOpti,
    watcher,
    default: series(sass, clean),
    build: series(sass, parallel(clean, jsOpti), imagelit)

}