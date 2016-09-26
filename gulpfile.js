var gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    minimist = require('minimist'),
    cssmin = require('gulp-cssmin'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    gulpUtil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    gulpCopy = require('gulp-file-copy'),
    fs = require('fs'),
    clean = require('gulp-clean'),
    requirejsOptimize = require('gulp-requirejs-optimize');
var options = {
  string: 'env',
  default: { env: process.env.NODE_ENV || '' }
};
options = minimist(process.argv.slice(2), options);

var _Config_TXT = {
    error_pre : 'need arguments!',
    line_pre  : '| --',
    arg_src   : 'src',
    arg_dest  : 'dest',
    arg_name  : 'name',
    wrap      : '\r\n'
}

var _C_T = _Config_TXT;

var checkExist = function(file) {

    if(!file) return gulpUtil.log(gulpUtil.colors.red(_C_T.wrap + _C_T.error_pre));

    if(fs.existsSync(file)) return gulpUtil.log(gulpUtil.colors.red('file  ' + file + '  exists'));

    return 'ok';
}

//文件清理 
gulp.task('clean', function() {
    if(!options.name) {
        return console.log(gulpUtil.colors.red(_C_T.error_pre +  _C_T.wrap + _C_T.line_pre + _C_T.arg_name + ' use , split'));
    }
    var _name = options.name.split(',');
    return gulp.src(_name, {read: false})
        .pipe(clean());
});
//css
gulp.task('css', function() {
    if(!options.src || !options.dest) {
        return console.log(gulpUtil.colors.red(_C_T.error_pre + _C_T.wrap + _C_T.line_pre + _C_T.arg_src + ' source files, use , split' +  _C_T.wrap + _C_T.line_pre + _C_T.arg_dest + 'build dir' +  _Config_TXT.wrap + _C_T.line_pre + _C_T.arg_name + ' out name, auto add .min, default: style.min.css'));
    }
    var _name = options.name || 'style.css'
    var _src = options.src.split(',');
    return gulp.src(_src)
        .pipe(concat(_name))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(options.dest));

});
//less
gulp.task('less', function() {
    if(!options.src || !options.dest) {
        return console.log(gulpUtil.colors.red(_C_T.error_pre + _C_T.wrap + _C_T.line_pre + _C_T.arg_src + ' source files, use , split' +  _C_T.wrap + _C_T.line_pre + _C_T.arg_dest + ' out folder'));
    }
    var _src = options.src.split(',');
    return gulp.src(_src)
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(options.dest));
});

gulp.task('rjs', function(){
    if(!options.src || !options.dest) {
        return console.log(gulpUtil.colors.red(_Config_TXT.error_pre + _C_T.wrap + _C_T.line_pre + _C_T.arg_src + ' source main export files, use , split' + _C_T.wrap + _C_T.line_pre + _C_T.arg_dest + ' out folder'));
    }
    var _src = options.src.split(',');
    return gulp.src(_src)
        .pipe(requirejsOptimize(function(file) {
                return {
                    baseUrl : file.base,
                    optimize: 'uglify'
                }
            }))
        .pipe(gulp.dest(options.dest));
});
