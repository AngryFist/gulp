require.config({
    baseUrl : './',
    paths: {
        'jquery' : '../dj_static/jquery/1.12.3/jquery.min'
    },
    shim: {},
    deps : ['jquery']
});

requirejs(['./modules/a', './modules/b'], function(a, b) {
    a.Init();
    b.Init();        
});
