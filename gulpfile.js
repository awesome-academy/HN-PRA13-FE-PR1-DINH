const { src, dest, parallel, watch, series } = require('gulp')
const concat = require('gulp-concat')
// const sass = require('gulp-sass')
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug')
const browserSync = require('browser-sync').create()
const replace = require('gulp-replace');

const FilesPath = { sassFiles: './sass/styles.scss', htmlFiles: './src/pages/*.pug' }
const {sassFiles, htmlFiles} = FilesPath;

function sassTask() { 
    return src(sassFiles) 
    .pipe(sass()) 
    .pipe(concat('./style.css'))
    .pipe(dest('./assets/css')) .pipe(browserSync.stream()); }


function htmlTask() { 
    return src(htmlFiles)
    .pipe(replace(/\.pug"/g, '.html"')) 
    .pipe(pug({ pretty: true }))
    .pipe(dest('.')) 
    .pipe(browserSync.stream()); }

// function jsTask() { return src(jsFiles) .pipe(concat('all.js')) .pipe(dest('dist/js')) }
// function assetsTask() { return src('assets/**/*') .pipe(dest('dist/assets')) }

  
function serve() { 
    browserSync.init({ server: { baseDir: '.' } }); 
    watch('./sass/**/*.scss', sassTask); 
    watch('./src/**/*.pug', htmlTask); 
}

// exports.js = jsTask; 
exports.sass = sassTask; 
exports.html = htmlTask; 
// exports.assets = assetsTask; 
// exports.default = series(parallel(htmlTask, sassTask));
exports.default = series(serve, parallel(htmlTask, sassTask))
        


