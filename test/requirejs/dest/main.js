define("modules/a",[],function(){var n=function(){alert("a")};return{Init:n}}),define("modules/../../test22/d",[],function(){var n=function(){alert("d")};return{Init:n}}),define("modules/c",["../../test22/d"],function(n){var t=function(){alert("c"),n.Init()};return{Init:t}}),define("modules/b",["./c"],function(n){var t=function(){alert("b"),n.Init()};return{Init:t}}),require.config({baseUrl:"./",paths:{jquery:"http://activity.daojia.com.cn/dj_static/jquery/1.12.3/jquery.min"},shim:{},deps:["jquery"]}),requirejs(["./modules/a","./modules/b"],function(n,t){n.Init(),t.Init()}),define("main",function(){});