app.filter('percent', function() {
    'use strict';

    return function(num) {
        return Math.round(num * 100);
    };
});
