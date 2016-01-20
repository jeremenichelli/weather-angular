// get units from storage and set default
window.sessionStorage.setItem('units', window.sessionStorage.getItem('units') === 'us' ? 'us' : 'si');

// weather app instance
var app = angular.module('weatherApp', [ 'ngRoute' ]);

// global geocoder instance
var geocoder = new google.maps.Geocoder();

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
