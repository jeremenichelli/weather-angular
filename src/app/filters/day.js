app.filter('day', function() {
    'use strict';

    return function(input) {
        var d = new Date();
        d.setTime(input * 1000);
        return d.toUTCString().split(',')[0];
    };
});
