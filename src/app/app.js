// build app and expose as global
window.app = (function(_win, _doc) {
    'use strict';

    _win.addEventListener('load', function() {
        _doc.body.classList.add('loaded');
    });

    // get units from storage and set default
    _win.localStorage.setItem('units', _win.localStorage.getItem('units') === 'us' ? 'us' : 'si');

    // weather app instance
    var app = angular.module('weatherApp', [ 'ngRoute' ]);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'homeController'
            })
            .when('/settings', {
                templateUrl: 'views/settings.html',
                controller: 'settingsController'
            })
            .when('/forecast/:lat/:lng', {
                templateUrl: 'views/forecast.html',
                controller: 'forecastController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

    return app;
})(window, document);
