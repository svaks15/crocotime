var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename =require('gulp-rename'),
    pug = require('gulp-pug'),
    watch = require('gulp-watch');


var path = {
    src: {
        js: './js/*.js',
        css: './stylus/*.styl',
        cssMainFile: './stylus/main.styl',
        template: './pug/*.pug'
    },
    public: {
        js: '../js/',
        jsFileName: 'app.js',
        css: '../css/',
        cssFileName: 'main.css',
        html: '../',
    }
};

//concat, minify stylus
gulp.task('stylus', function () {
     return gulp.src(path.src.cssMainFile)
         .pipe(plumber())
         .pipe(sourcemaps.init())
         .pipe(stylus({
             compress: true,
             "sourcemap=none": true
         }))
         .pipe(autoprefixer({
             browsers: ['last 2 versions'],
             cascade: false
         }))
         .pipe(sourcemaps.write('.'))
        // .pipe(rename({suffix: '.min'}))
         .pipe(gulp.dest(path.public.css));
});


//generate html from pug
gulp.task('pug', function () {
    return gulp.src(path.src.template)
        .pipe(plumber())
        .pipe(pug({}))
        .pipe(gulp.dest(path.public.html))
        .pipe(livereload());
});

//reload main css file
gulp.task('css-lr', function () {
    return gulp.src(path.public.css + path.public.cssFileName)
        .pipe(livereload());
});

//concat, minify js
gulp.task('scripts', function(){
    gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat(path.public.jsFileName))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.public.js));
});

//all time watch change
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(path.src.js, ['scripts']);
    gulp.watch(path.src.template, ['pug']);
    gulp.watch(path.src.css, ['stylus']);
    gulp.watch(path.public.css + path.public.cssFileName, ['css-lr']);
});

// for new file
gulp.src(path.src.css)
    .pipe(watch(path.src.css, function() {
        gulp.start('stylus');
    }));
gulp.src(path.src.js)
    .pipe(watch(path.src.js, function() {
        gulp.start('default');
    }));

// default task
gulp.task('default', ['stylus','scripts','pug','watch']);




