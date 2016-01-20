app.factory('forecast', [ '$http', function($http) {
    var API_KEY = 'd2f10d30cba4c573db84bdb9a65a34b6',
        CB = '&callback=JSON_CALLBACK';

    return function(lat, lng) {
        return $http
            .jsonp('https://api.forecast.io/forecast/' + API_KEY + '/' + lat + ',' + lng + '?units=si' + CB)
            .success(function(data) {
                return data;
            })
            .error(function(err) {
                return err;
            });
    };
}]);