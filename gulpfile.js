const { src, dest, series, parallel, watch } = require('gulp');

const source_folder = '#src';
const project_folder = 'dist';
// const project_folder = require('path').basename(__dirname);


const path = {
    build: {
        html: `${project_folder}/`,
        css: `${project_folder}/css/`,
        js: `${project_folder}/js/`,
        img: `${project_folder}/img/`,
        fonts: `${project_folder}/fonts/`,
    },
    src: {
        html: `${source_folder}/index.html`,
        css: `${source_folder}/scss/style.scss`,
        js: `${source_folder}/js/**/*.js`,
        img: `${source_folder}/img/*.{jpg,png,svg,webp,ico}`,
        img_no: `${source_folder}/img/notoptimize/*.{jpg,png,svg,webp,ico}`,
        fonts: `${source_folder}/fonts/*.ttf`,
    },
    watch: {
        html: `${source_folder}/**/*.html`,
        css: `${source_folder}/scss/**/*.scss`,
        js: `${source_folder}/js/**/*.js`,
        img_no: `${source_folder}/img/notoptimize/*.{jpg,png,svg,webp}`,
        img: `${source_folder}/img/*.{jpg,png,svg,webp}`,
    },
    clean: `./${project_folder}/`,
}

const browsersync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const del = require('del');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const rigger = require('gulp-rigger');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-csso');
const terser = require('gulp-terser');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const groupmedia = require('gulp-group-css-media-queries');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const webp = require('gulp-webp');
const fonter = require('gulp-fonter');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');


function html() {
    return src(path.src.html)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(plumber())
        .pipe(
            scss({
                outputStyle: 'expanded',
            })
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 5 versions'],
                cascade: true,
                grid: "autoplace",
            })
        )
        .pipe(groupmedia())
        .pipe(dest(path.build.css))
        .pipe(cssmin())
        .pipe(
            rename({
                extname: '.min.css'
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src([path.src.js, `!${source_folder}/js/libs/*.js`])
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function images() {
    return src(path.src.img_no)
        .pipe(plumber())
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest(`${source_folder}/img/`))
        .pipe(src(path.src.img_no))
        .pipe(
            imagemin([
                imagemin.optipng({
                    optimizationLevel: 3
                }),
                imagemin.mozjpeg({
                    progressive: true
                }),
                // imagemin.svgo()
            ])
        )
        .pipe(dest(`${source_folder}/img/`))
        .pipe(browsersync.stream())
}

function copy() {
    src(path.src.img)
        .pipe(dest(path.build.img))
    return src(`${source_folder}/fonts/*.{woff,woff2}`)
        .pipe(dest(path.build.fonts))
}

function sprite() {
    return src(`${source_folder}/img/sprite/*.svg`)
        .pipe(plumber())
        .pipe(
            svgstore({
                inlineSvg: true
            })
        )
        .pipe(rename("sprite.svg"))
        .pipe(dest(`${source_folder}/img/notoptimize/`))
}

function otf2ttf() {
    return src(`${source_folder}/fonts/*.otf`)
        .pipe(plumber())
        .pipe(
            fonter({
                formats: ['ttf']
            })
        )
        .pipe(dest(`${source_folder}/fonts/`))
}

function fonts() {
    src(path.src.fonts)
        .pipe(plumber())
        .pipe(ttf2woff())
        .pipe(dest(`${source_folder}/fonts/`))
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(`${source_folder}/fonts/`))
}

function htmlminify() {
    return src(path.src.html)
        .pipe(plumber())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(
            rename({
                extname: '.min.html'
            })
        )
        .pipe(dest(path.build.html))
}

function jsminify() {
    return src(path.src.js)
        .pipe(plumber())
        .pipe(terser())
        .pipe(
            rename({
                extname: '.min.js'
            })
        )
        .pipe(dest(path.build.js))
}

function browserSync() {
    browsersync.init({
        server: {
            baseDir: `./${project_folder}/`
        },
        port: 3000,
        notify: false
    })
}

function clean() {
    return del(path.clean)
}

function watchFiles() {
    watch([path.watch.html], html);
    watch([path.watch.css], css);
    watch([path.watch.js], js);
    // watch([path.watch.img_no], images);
    // watch([path.watch.img], copy);
}

const build = series(clean, copy, parallel(html, css, js));
const startServer = parallel(build, watchFiles, browserSync);

exports.copy = copy;
exports.jsminify = jsminify;
exports.htmlminify = htmlminify;
exports.otf2ttf = otf2ttf;
exports.fonts = fonts;
exports.images = images;
exports.sprite = sprite;
exports.build = build;
exports.default = startServer;