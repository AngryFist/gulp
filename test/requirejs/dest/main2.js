define("modules/a",[],function(){var e=function(){alert("a")};return{Init:e}}),require.config({baseUrl:"./",paths:{jquery:"http://activity.daojia.com.cn/dj_static/jquery/1.12.3/jquery.min"},shim:{},deps:["jquery"]}),requirejs(["./modules/a"],function(e){e.Init()}),define("main2",function(){});