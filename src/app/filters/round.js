app.filter('round', function() {
    'use strict';

    return function(num) {
        return Math.round(num);
    };
});
