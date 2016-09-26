define(['./c'],function(c) {

    var Init = function(){
        alert('b');
        c.Init();
    }

    return {
        Init : Init
    }
});