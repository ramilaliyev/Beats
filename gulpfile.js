const {task, src, dest, series, watch, parallel} = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const remove = require('gulp-rm');
const concat = require('gulp-concat');
const sass = require('gulp-sass')
const sassGlob = require('gulp-sass-glob');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

sass.compiler = require('node-sass');

const env = process.env.NODE_ENV;

// Очистка

task('remove', ()=> {
    console.log(env);
    return src('dist/**/*', {read: false})
    .pipe(remove());
});

// Копирование файлов (Перенос в dist как есть)

    // HTML 

task('copy:html', () => {
    return src('src/index.html').pipe(dest('dist')).pipe(reload({stream: true}));
});

    // IMG

task('copy:img', () => {
    return src('src/img/**/*').pipe(dest('dist/img')).pipe(reload({stream: true}));
});

    // SVG - декор

task('copy:decor', () => {
    return src('src/decor-icons/*').pipe(dest('dist/decor-icons')).pipe(reload({stream: true}));
});

// Сбор стилей

task('style', () => {
    return src('src/style/style.scss')
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('style.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(reload({stream: true}));
});

// Сбор скриптов

task('script', () => {
    return src('src/script/*.js')
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('script.min.js'))
    .pipe(gulpif(env === 'prod',uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(reload({stream: true}));
});

// Сборка SVG Sprite-ов

task('sprite', () => {
    return src('src/icons/*.svg')
    .pipe(svgo({
        plugins: [
        {
            removeAttrs: {
            attrs: '(fill|stroke|width|height|data.*|style)'
            }
        }
        ]
    }))
    .pipe(svgSprite({
        mode: {
            symbol: {
                sprite: '../sprite.svg'
            }
        }
    }))
    .pipe(dest('dist'))
    .pipe(reload({stream: true}));;
});

// Слежка за изменениями файлов

task('watch', () => {
    watch('src/index.html', series('copy:html'));
    watch('src/decor-icons/*.svg', series('copy:decor'));
    watch('src/img/**/*', series('copy:img'));
    watch('src/style/**/*.scss', series('style'));
    watch('src/icons/*.svg', series('sprite'));
    watch('src/script/*.js', series('script'));

})

// Синхронизированный сервер

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

// Итог (по умолчанию, все записывать сюда)

task('default', series('remove', parallel('copy:html', 'copy:img', 'copy:decor', 'style', 'script', 'sprite'), parallel('watch', 'server')));