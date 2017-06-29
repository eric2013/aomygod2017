// gulpfile.js 版本1
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cssmin      = require('gulp-clean-css');
var htmlmin     = require('gulp-htmlmin');
var imagemin    = require('gulp-imagemin');
var jsmin       = require('gulp-uglify');
var rename      = require('gulp-rename');
var concat      = require('gulp-concat');
var filter = require('gulp-filter');




var reload      = browserSync.reload;
 

//打版本号
// var revCollector = require('gulp-rev-collector');
// var minifyHTML   = require('gulp-minify-html');
// gulp.task('rev', function () {
//     return gulp.src(['rev/**/*.json', 'templates/**/*.html'])
//         .pipe( revCollector({
//             replaceReved: true,
//             dirReplacements: {
//                 'css': '/dist/css',
//                 '/js/': '/dist/js/',
//                 'cdn/': function(manifest_value) {
//                     return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
//                 }
//             }
//         }) )
//         .pipe( minifyHTML({
//                 empty:true,
//                 spare:true
//             }) )
//         .pipe( gulp.dest('dist') );
// });

var Asset = {       // 配置监听路径
    html: './src/html/*.html',
    js: './src/js/*.js',
    sass: './src/sass/*.scss',
    img: './src/images/*'
}
 
// 启动静态服务器
gulp.task('server', function() {
    browserSync.init({
        server: "./dist/"
    });
});
 
gulp.task('html', function() {      // html代码的处理模块
  gulp.src(Asset.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'));
});
 
gulp.task('img', function() {       // 图片的处理模块，负责压缩图片什么的
    return gulp.src(Asset.img)
        .pipe(imagemin({optimizationLevel: 7}))
        .pipe(gulp.dest('dist/images/'));
});
 
gulp.task('js', ['copy'], function() {// js的处理模块
  const f1 = filter(['**', '!*/jquery-1.11.3.js'], {restore: true});  
  return gulp.src(Asset.js)
    .pipe(f1)
    .pipe(jsmin())
    .pipe(concat('all.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(f1.restore)  
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('copy', function() { 
  return gulp.src('./src/js/lib/*.js') 
    .pipe(gulp.dest('dist/js/lib/'));
});

gulp.task('sass', function() {      // sass处理模块
    return gulp.src(Asset.sass)
        .pipe(sass())
        .pipe(prefix({
            browsers: ['last 2 versions'],      // 浏览器版本
            cascade: true,                       // 美化属性，默认true
            add: true,                          // 是否添加前缀，默认true
            remove: true,                        // 删除过时前缀，默认true
            flexbox: true                       // 为flexbox属性添加前缀，默认true
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssmin())
        .pipe(gulp.dest("dist/css/"))
        .pipe(reload({stream: true}));
});

gulp.task('watch', function() {     // 监听服务
    gulp.watch(Asset.sass, ['sass'], reload);
    gulp.watch(Asset.js, ['js'], reload);
    gulp.watch(Asset.html, ['html'], reload);
    gulp.watch(Asset.img, ['img'], reload);
    gulp.watch("*").on('change', reload);
    gulp.watch("./dist/**/*.*").on('change', reload);
});
 
// 启动
gulp.task('default', ['sass', 'img', 'html', 'js', 'server', 'watch']);