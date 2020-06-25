const gulp          = require('gulp');
const sourcemaps    = require('gulp-sourcemaps');
const fileinclude   = require('gulp-file-include');
const htmlmin       = require('gulp-html-minifier');
const htmlbeautify  = require('gulp-html-beautify');
const concat        = require('gulp-concat');
const log           = require('gulplog');
const rev           = require('gulp-rev');
const revReplace    = require('gulp-rev-replace');
const cached        = require('gulp-cached');
const remember      = require('gulp-remember');
const rename        = require('gulp-rename');
const ico =           require('gulp-to-ico');

const babel         = require('gulp-babel');
const browserify    = require('browserify');
const eslint        = require('gulp-eslint');
const uglify        = require('gulp-uglify');

const sass          = require('gulp-sass');
const autoprefixer  = require('gulp-autoprefixer');

const svgSprite     = require("gulp-svg-sprites");
const svg2png       = require('gulp-svg2png');
const responsive    = require('gulp-responsive');
const imagemin      = require('gulp-imagemin');

const ftp           = require('vinyl-ftp');
const del           = require('del');
const source        = require('vinyl-source-stream');
const buffer        = require('vinyl-buffer');
const path          = require('path');

const isProd = process.argv.indexOf('--prod') > -1;

const PATH = {
    src: {
        jsEntry: 'src/js/index.js',
        jsScripts: ['src/js/**/*.js'],
        scssStyles: ['src/scss/**/*.scss'],
        scssTmp: 'tmp/scss/**/*.scss',
        phpEntry: ['src/index.php'],
        phpLibs: 'src/phpLibs/**/*.php',
        phpTemplates: ['src/templates/**/*.*', '!src/templates/**/*.md'],
        phpAdmin: 'src/admin/**/*.json',
        scripts: ['src/scripts/**/*.php'],
        fonts: ['src/fonts/**/*.*', '!src/fonts/README.md'],
        iconsSVG: 'src/icons/**/*.svg',
        icons: ['src/icons/**/*.*', '!src/icons/favicon.png', '!src/icons/README.md'],
        favicon: ['src/icons/favicon.png'],
        images: ['src/images/**/*.*', '!src/images/**/*.md'],
        files: ['src/files/**/*.*']
    },
    dist: {
        root: './dist',
        js: './dist/js',
        css: './dist/css',
        scripts: './dist/scripts',
        phpLibs: './dist/phpLibs',
        fonts: './dist/fonts',
        icons: './dist/icon',
        favicon: './dist/favicon',
        sprites: './dist/sprites',
        images: './dist/images',
        templates: './dist/templates',
        admin: './dist/admin',
        files: './dist/files'
    },
    tmp: 'tmp/',
    external: {
        css: [],
        js: [
            './external/js/responsive-img.js'
        ]
    },
    manifest: {
        path: './manifest',
        externalJS: 'js.external.json',
        externalCSS: 'css.external.json',
        scripts: 'scripts.json',
        style: 'style.json',
    }
};

const FTP = {
    connect: {
        host: 'host',
        user: 'user',
        pass: 'pass'
    },
    path: [
        'dist/**',
        'dist/.htaccess',
    ]
};

const autoprefixerOptions = {
    browsers: ['last 2 versions', 'ios >= 8', 'not ie < 9', 'not ie_mob < 9'],
    cascade: false
};

gulp.task('clean:dist', function () {
    return del(`${PATH.dist.root}`);
});

gulp.task('clean:tmp', function () {
    return del(`${PATH.tmp}`);
});

gulp.task('clean:manifest', function () {
    return del(`${PATH.manifest.path}`);
});

gulp.task('css:styles', function () {
    if (isProd) {
        return gulp.src(PATH.src.scssStyles, {allowEmpty: true})
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(autoprefixer(autoprefixerOptions))
            .pipe(concat('style.css'))
            .pipe(rev())
            .pipe(gulp.dest(PATH.dist.css))
            .pipe(rev.manifest(PATH.manifest.style))
            .pipe(gulp.dest(PATH.manifest.path))
    } else {
        return gulp.src(PATH.src.scssStyles, {allowEmpty: true})
            .pipe(cached('css:styles'))
            .pipe(remember('css:styles'))
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
            .pipe(autoprefixer(autoprefixerOptions))
            .pipe(concat('style.css'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(PATH.dist.css));
    }
});

gulp.task('css:external', function (done) {
    if (PATH.external.css.length) {
        if (isProd) {
            return gulp.src(PATH.external.css, {allowEmpty: true})
                .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
                .pipe(autoprefixer(autoprefixerOptions))
                .pipe(concat('external.css'))
                .pipe(rev())
                .pipe(gulp.dest(PATH.dist.css))
                .pipe(rev.manifest(PATH.manifest.externalCss))
                .pipe(gulp.dest(PATH.manifest.path))
        } else {
            return gulp.src(PATH.external.css, {allowEmpty: true})
                .pipe(sourcemaps.init())
                .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
                .pipe(autoprefixer(autoprefixerOptions))
                .pipe(concat('external.css'))
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest(PATH.dist.css));
        }
    } else {
        done();
    }
});

gulp.task('js:scripts', function (done) {
    let b = browserify({
        entries: PATH.src.jsEntry,
        debug: true
    });

    if (isProd) {
        b.bundle()
            .on('error', log.error)
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(rev())
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(uglify())
            .pipe(gulp.dest(PATH.dist.js))
            .pipe(rev.manifest(PATH.manifest.scripts))
            .pipe(gulp.dest(PATH.manifest.path))
    } else {
        b.bundle()
            .on('error', log.error)
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(cached('js:scripts'))
            .pipe(remember('js:scripts'))
            .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(eslint())
                .pipe(eslint.format())
                .pipe(eslint.failAfterError())
                .pipe(babel({
                    presets: ['env']
                }))
                .on('error', log.error)
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(PATH.dist.js));
    }

    return done();
});

gulp.task('js:external', function (done) {
    if (PATH.external.js.length) {
        if (isProd) {
            return gulp.src(PATH.external.js, {allowEmpty: true})
                .pipe(babel({
                    presets: ['env']
                }))
                .pipe(concat('external.js'))
                .pipe(rev())
                .pipe(uglify())
                .pipe(gulp.dest(PATH.dist.js))
                .pipe(rev.manifest(PATH.manifest.externalJS))
                .pipe(gulp.dest(PATH.manifest.path));
        } else {
            return gulp.src(PATH.external.js, {allowEmpty: true})
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(babel({
                    presets: ['env']
                }))
                .pipe(concat('external.js'))
                .pipe(uglify())
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest(PATH.dist.js));
        }
    } else {
        done();
    }
});

gulp.task('php:entry', function () {
    if (isProd) {
        return gulp.src(PATH.src.phpEntry, {allowEmpty: true})
            .pipe(rename({
                extname: ".html"
            }))
            .pipe(revReplace({
                manifest: gulp.src(PATH.manifest.path + '/*.json')
            }))
            .pipe(rename({
                extname: ".php"
            }))
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest(PATH.dist.root));
    } else {
        return gulp.src(PATH.src.phpEntry, {allowEmpty: true})
            .pipe(htmlbeautify({
                indentSize: 4
            }))
            .pipe(gulp.dest(PATH.dist.root));
    }
});

gulp.task('php:libs', function () {
    return gulp.src(PATH.src.phpLibs, {allowEmpty: true})
        .pipe(gulp.dest(PATH.dist.phpLibs));
});

gulp.task('php:templates', function () {
    return gulp.src(PATH.src.phpTemplates, {allowEmpty: true})
        .pipe(gulp.dest(PATH.dist.templates));
});

gulp.task('php:admin', function () {
    return gulp.src(PATH.src.phpAdmin, {allowEmpty: true})
        .pipe(gulp.dest(PATH.dist.admin));
});

gulp.task('php:scripts', function () {
    //del(`${'./dist/scripts/'}`);

    return gulp.src(PATH.src.scripts, {allowEmpty: true})
        .pipe(gulp.dest(PATH.dist.scripts));
});

gulp.task('static:fonts', function () {
    del(`${'./dist/fonts/'}`);

    return gulp.src(PATH.src.fonts, {allowEmpty: true})
        .pipe(gulp.dest(PATH.dist.fonts));
});

gulp.task('static:svg', function () {
    return gulp.src(PATH.src.iconsSVG, {allowEmpty: true})
        .pipe(svgSprite({
            preview: false,
            common: 'svgImg',
            layout: 'vertical',
            cssFile: 'scss/sprite.scss',
            svg: {
                sprite: 'sprites/sprite.svg'
            },
            selector: 'svgImg_%f',
            baseSize: 16,
            templates: {
                scss: true
            }
        }))
        .pipe(gulp.dest(PATH.tmp));
});

gulp.task('static:tmpIcons', function (done) {
    gulp.src(PATH.tmp + 'sprites/sprite.svg', {allowEmpty: true})
        .pipe(gulp.dest(PATH.dist.sprites))
        .pipe(svg2png())
        .pipe(imagemin())
        .pipe(gulp.dest(PATH.dist.sprites));

    done();
});

gulp.task('static:icons', function () {
    //del(`${'./dist/icons/'}`);

    return gulp.src(PATH.src.icons, {allowEmpty: true})
        .pipe(imagemin())
        .pipe(gulp.dest(PATH.dist.icons));
});

gulp.task('static:faviconICO', function (done) {
    del(`${'./dist/favicon/'}`);

    gulp.src(PATH.src.favicon, {allowEmpty: true})
        .pipe(responsive({'favicon.png': [{width: 57}]},{errorOnUnusedConfig: false}))
        .pipe(ico('fav.ico'))
        .pipe(gulp.dest(PATH.dist.favicon));

    return done();
});

gulp.task('static:faviconPNG', function () {
    return gulp.src(PATH.src.favicon, {allowEmpty: true})
        .pipe(imagemin())
        .pipe(responsive({
            'favicon.png': [
                {
                    width: 180,
                    rename: 'fav_180.png'
                },
                {
                    width: 144,
                    rename: 'fav_144.png'
                },
                {
                    width: 114,
                    rename: 'fav_114.png'
                },
                {
                    width: 72,
                    rename: 'fav_74.png'
                },
                {
                    width: 64,
                    rename: 'fav_64.png'
                },
                {
                    width: 57,
                    rename: 'fav_57.png'
                }
            ]
        },{errorOnUnusedConfig: false}))
        .pipe(gulp.dest(PATH.dist.favicon));
});

gulp.task('static:images', function () {
    del(`${'./dist/images/'}`);

    return gulp.src(PATH.src.images, { allowEmpty: true })
        .pipe(imagemin())
        .pipe(responsive({
            '*/*.{png,jpg}': [
                {
                    width: '100%',
                    rename: {
                        prefix: '5x@'
                    }
                },
                {
                    width: '75%',
                    rename: {
                        prefix: '4x@'
                    }
                },
                {
                    width: '50%',
                    rename: {
                        prefix: '3x@'
                    }
                },
                {
                    width: '35%',
                    rename: {
                        prefix: '2x@'
                    }
                },
                {
                    width: '25%',
                    rename: {
                        prefix: '1x@'
                    }
                },
            ],
            '*.{png,jpg}': [
                {
                    width: '100%',
                    rename: {
                        prefix: '5x@'
                    }
                },
                {
                    width: '75%',
                    rename: {
                        prefix: '4x@'
                    }
                },
                {
                    width: '50%',
                    rename: {
                        prefix: '3x@'
                    }
                },
                {
                    width: '35%',
                    rename: {
                        prefix: '2x@'
                    }
                },
                {
                    width: '25%',
                    rename: {
                        prefix: '1x@'
                    }
                },
            ]
        },{errorOnUnusedConfig: false}))
        .pipe(gulp.dest(PATH.dist.images));
});


gulp.task('static:files', function () {
    return gulp.src(PATH.src.files, {allowEmpty: true})
        .pipe(gulp.dest(PATH.dist.files));
});


gulp.task('clean', gulp.series(
    gulp.parallel('clean:dist', 'clean:tmp', 'clean:manifest')
));

gulp.task('build', gulp.series(
    gulp.parallel(
        gulp.series('static:svg', 'static:icons', 'static:tmpIcons'),
        gulp.series('static:faviconICO', 'static:faviconPNG')
    ),
    gulp.series('static:images', 'static:fonts', 'static:files'),
    gulp.series('js:scripts', 'js:external'),
    gulp.series('css:styles', 'css:external'),
    gulp.parallel('php:entry', 'php:libs', 'php:admin', 'php:templates', 'php:scripts')
));

gulp.task('deploy', function () {
    let conn = ftp.create(FTP.connect);

    //#TODO Если в директории 1 файл и его удалили, то на сервере он останется. Это происходит из-за того, что Gulp не
    //#TODO передает в поток пустые директории, а соответственно функция clear не срабатывет.

    return gulp.src(FTP.path, {base: './build/', buffer: true, allowEmpty: true})
        .pipe(conn.newer('public_html/'))
        .pipe(conn.dest('public_html/'))
        .pipe(conn.mode('public_html/', '0700'))
        .pipe(
            conn.clean([
                '**'
            ], './dist/', { base: '/public_html/' })
        );
});

gulp.task('watch', function() {
    gulp.watch(PATH.src.jsScripts, gulp.series('js:scripts')).on('unlink', function(filepath) {
        remember.forget('js:scripts', path.resolve(filepath));
        delete cached.caches['js:scripts'][path.resolve(filepath)];
    });
    gulp.watch(PATH.external.js, gulp.series('js:external'));

    gulp.watch(PATH.src.scssStyles, gulp.series('css:styles')).on('unlink', function(filepath) {
        remember.forget('css:styles', path.resolve(filepath));
        delete cached.caches['css:styles'][path.resolve(filepath)];
    });
    gulp.watch(PATH.external.css, gulp.series('css:external'));

    gulp.watch(PATH.src.scripts, gulp.series('php:scripts'));
    gulp.watch(PATH.src.phpEntry, gulp.series('php:entry'));
    gulp.watch(PATH.src.phpTemplates, gulp.series('php:templates'));
    gulp.watch(PATH.src.phpAdmin, gulp.series('php:admin'));


    gulp.watch(PATH.src.images, gulp.series('static:images'));
    gulp.watch(PATH.src.icons, gulp.series('static:icons'));
    gulp.watch(PATH.src.files, gulp.series('static:files'));
    gulp.watch(PATH.src.favicon, gulp.series('static:faviconICO', 'static:faviconPNG'));

    gulp.watch(PATH.src.iconsSVG, gulp.series('static:svg', 'static:tmpIcons', 'css:styles'));
});

gulp.task('default', gulp.series('clean', gulp.series('build', 'watch')));

