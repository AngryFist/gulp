var gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    minimist = require('minimist'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    gulpUtil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    gulpCopy = require('gulp-file-copy'),
    fs = require('fs'),
    clean = require('gulp-clean'),
    requirejsOptimize = require('gulp-requirejs-optimize');

var distDir = 'dist/'
    resoucesDir = 'resources/',
    jsReleaseDir = 'js/release/',
    cssReleaseDir = 'css/release/',
    mainJsDir = 'js/require_modules/';

var options = {
  string: 'env',
  default: { env: process.env.NODE_ENV || '' }
};

options = minimist(process.argv.slice(2), options);

var checkExist = (file) => {

    if(!file) return gulpUtil.log(gulpUtil.colors.red('\r\n 缺少参数！'));

    if(fs.existsSync(file)) return gulpUtil.log(gulpUtil.colors.red('文件已存在'));

    return 'ok';
}

//文件清理 
gulp.task('clean', () => {
    if(!options.name) {
        return gulpUtil.log(gulpUtil.colors.red('缺少参数 \r\n --name 需要清理的目录或文件名称，多个用逗号隔开'));
    }
    var _name = options.name.split(',');
    gulpUtil.log(gulpUtil.colors.green('清理目录 ' + _name));
    return gulp.src(_name, {read: false})
        .pipe(clean());
});


//css
gulp.task('css', () => {

    if(!options.src || !options.dist) {
        return gulpUtil.log(gulpUtil.colors.red('缺少参数 \r\n --src 源文件，用逗号隔开 \r\n --dist 目标目录 \r\n --name 输出的文件名，会自动添加.min后缀 可以为空 默认为style.css'));
    }

    var _name = options.name || 'style.css'

    if(checkExist(options.dist) === 'ok'){
        gulpUtil.log(gulpUtil.colors.green('操作提示 -> 目标：' + options.dist));
        var _src = options.src.split(',');
        
        gulp.src(_src)
            .pipe(concat(_name))
            .pipe(cssmin())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(options.dist));
    }

});

gulp.task('requirejs', () => {
    gulpUtil.log(gulpUtil.colors.green('操作提示 -> 构建JS......'));
    return gulp.src(distDir + resoucesDir + mainJsDir + '*Main.js')
        .pipe(requirejsOptimize(function(file) {
            return {
                baseUrl : distDir + resoucesDir + mainJsDir,
                paths: {  //相对baseUrl的路径
                    'common' : '../common_modules',
                    'jquery' : '../vendor/jquery/1.12.1/jquery'
                },
                exclude : ['jquery'],
                fileExclusionRegExp: /^(r|build)\.js|dist|build$/, 
                optimize: 'uglify'
            }
        }))
        .pipe(gulp.dest(distDir + resoucesDir + jsReleaseDir + options.env));
});
//require js打包
gulp.task('js', () => {
    if(checkExist(options.dist) === 'ok'){
        gulp.run('requirejs');
    }
});
