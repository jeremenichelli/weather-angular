app.filter('fahrenheit', function() {
    'use strict';

    return function(temp) {
        return Math.round(temp * 9 / 5 + 32);
    };
});
