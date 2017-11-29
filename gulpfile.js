/**
 * Created by Qiaodan on 2017/5/19.
 */


var gulp = require('gulp');
    //rev = require('gulp-rev');
   // revCollector = require('gulp-rev-collector')

//服务器,开发
var devServer = require('./gulp/dev/server.dev.js');

gulp.task('connect', devServer);


//更新所有less文件 开发
var devLess = require('./gulp/dev/less.dev.js');

gulp.task('changeLessDev', devLess);



//js合并，开发
var devJs = require('./gulp/dev/js.dev.js');

gulp.task('changeJsDev', devJs);


//ejs模板引擎 html 开发
var devEjs = require('./gulp/dev/ejs.dev.js');

gulp.task('fileIncludeDev', devEjs);


//图片压缩 开发
var devImg = require('./gulp/dev/img.dev.js');

gulp.task('imageMinDev',devImg);

//视频 开发
var devAudio = require('./gulp/dev/audio.dev.js');

gulp.task('devAudio',devAudio);


//监听文件变化
gulp.task('devWatch',function () {

    //less文件修改 ，注入css
    gulp.watch('src/**/*.less', ['changeLessDev']);

    //图片文件修改 ，注入css
    gulp.watch(['src/icon/*.*','src/images/**/*.*'], ['imageMinDev']);

    //html文件修改，重新拼接，刷新
    gulp.watch(['src/**/*.ejs','src/**/**/*.ejs'], ['fileIncludeDev']);

    //js文件修改，重新拼接，刷新
    gulp.watch('src/**/*.js',['changeJsDev'])

});

//开发环境
gulp.task('myServer',['devWatch','connect','imageMinDev','changeLessDev','changeJsDev','fileIncludeDev','devAudio']);


//js压缩 交付
var distJs = require('./gulp/dis/js.dist.js');

gulp.task('distJs', distJs);


//css压缩 交付
var distCss = require('./gulp/dis/css.dist.js');

gulp.task('distCss', distCss);


//图片移动
var distImg = require('./gulp/dis/img.dist.js');

gulp.task('distImg', distImg);

//清除
var distClean = require('./gulp/dis/clean.dist');

gulp.task('distClean', distClean);

//视频
var distAudio = require('./gulp/dis/audio.dist.js');

gulp.task('distAudio',distAudio);

//html
var distHtml = require('./gulp/dis/html.dist.js');

gulp.task('distHtml', distHtml);

gulp.task('.dist', [ 'changeLessDev', 'changeJsDev', 'fileIncludeDev','distClean'],function () {

    gulp.start('imageMinDev','distJs', 'distCss', 'distImg', 'distHtml','distAudio')

});