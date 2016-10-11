# gulp自动化工作流

## 安装

    1. npm install gulp -g
    2. npm install

## 相关命令

### clean   清理文件
    
    options:
        --name 需要清理的文件名称，用逗号隔开

### cssmin  合并压缩css

    options:
        --src 需要压缩的css文件，用逗号隔开
        --dest 构建目录
        --name 构建后的文件名称，会自动添加.min后缀。 非必需，默认为：style.css

### lessmin  合并压缩lesscss

    options:
        --src 需要压缩的less主入口文件，用逗号隔开
        --dest 构建目录

### rjs  合并压缩requirejs模块

    options:
        --src 需要压缩的less主入口文件，用逗号隔开
        --dest 构建目录

### jsmin  合并压缩js文件

    options:
        --src 需要压缩的js文件，用逗号隔开
        --dest 构建目录
        --name 构建后的文件名称，会自动添加.min后缀。 非必需，默认为：build-时间戳.min.js
