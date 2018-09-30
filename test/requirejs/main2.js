require.config({
    baseUrl : './',
    paths: {
        'jquery' : '../jquery/1.12.3/jquery.min'
    },
    shim: {},
    deps : ['jquery']
});

requirejs(['./modules/a'], function(a) {
    a.Init();     
});
