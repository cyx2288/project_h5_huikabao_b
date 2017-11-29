/**
 * Created by 陈羽翔 on 2017/11/20.
 * 音频处理
 */

var gulp = require('gulp'),

    cached = require('gulp-cached');//缓存

function devAudio() {

    return gulp.src('src/audio/**/*.mp3')

        .pipe(cached('devAudio'))        // 只传递更改过的文件

        .pipe(gulp.dest('build/audio'));

}

module.exports = devAudio;