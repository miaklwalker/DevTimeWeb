const gulp = require('gulp'),
        htmlreplace = require('gulp-html-replace'),
        sass = require('gulp-sass'),
        minifycss = require('gulp-clean-css'),
        autoprefixer = require('gulp-autoprefixer'),
        liveServer = require('live-server'),
        babel = require('gulp-babel'),
        del = require('del');
        sass.compiler = require('dart-sass');

const params = {
    port: 5500,
    host: "0.0.0.0",
    open: true,
    file: "index.html",
    wait: 1000,
    mount: [['/dist', './node_modules']],
    logLevel: 2,
};

const paths = {
    style: {
        src: './scss/*.scss',
        dest: './dist/css'
    },
    script: {
        src: './typescript/*.ts',
        dest: './dist/js'
    }
};

function img() {
    return gulp.src('./images/png/**')
        .pipe(gulp.dest('./dist/images/png'));
}

function icons() {
    return gulp.src('./icons/*.png')
        .pipe(gulp.dest('./dist/icons'));
}

function svg() {
    return gulp.src('./images/svg/*.svg')
        .pipe(gulp.dest('./dist/images/svg'));
}

function config() {
    return gulp.src(['./_redirects', './*.txt',
        //'./CNAME',
        //'./favicon.ico',
        './site.webmanifest'])
        .pipe(gulp.dest('./dist'));
}

function html() {
    return gulp.src('./index.html')
        .pipe(htmlreplace({
            'css': './css/main.css',
            'js': {
                src: './js/main.js',
                tpl: '<script src="%s" type="module"></script>'
            },
        }, {
            keepBlockTags: false,
        }))
        .pipe(gulp.dest('./dist'))
}

function pages() {
    return gulp.src('./pages/*.html')
        .pipe(htmlreplace({
            'css': '../css/main.css',
            'pages': {
                src: './js/main.js',
                tpl: '<script src=".%s" type="module"></script>'
            }
        }, {
            keepBlockTags: false,
        }))
        .pipe(gulp.dest('./dist/pages'))
}

function style() {
    const {style: {src, dest}} = paths;
    return gulp
        .src(src)
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(autoprefixer())
        .pipe(minifycss())
        .pipe(gulp.dest(dest));
}

function scripts() {
    const {script: {src, dest}} = paths;
    return gulp.src(src)
        .pipe(babel())
        .pipe(gulp.dest(dest));
}

function cleanOldBuild() {
    return del(['./dist'])
}

function serve() {
    liveServer.start(params);
    gulp.watch(paths.script.src, gulp.series(scripts));
    gulp.watch(paths.style.src, gulp.series(style));
    gulp.watch('../pages/*.html', pages);
    gulp.watch('../index.html', html);
}

const dev = gulp.series(cleanOldBuild, gulp.parallel(style, scripts, html, img, svg, pages, config, icons), serve);

const build = gulp.series(cleanOldBuild, gulp.parallel(style, scripts, html, img, svg, pages, config, icons));

exports.sass = style;
exports.html = html;
exports.scripts = scripts;
exports.build = build;
exports.default = dev;