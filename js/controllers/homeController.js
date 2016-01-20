app.controller('homeController', [ '$scope', '$window', 'cities', function($scope, $window, cities) {
    var timer;

    $scope.cities = [];

    /*
     * When user types list cities
     * @method $scope.toForecast
     */
    $scope.listCities = function(e) {
        var input = e.target;

        // clear timer
        clearTimeout(timer);

        // debounce key event
        timer = setTimeout(function() {
            if (input.value) {
                cities(input.value, function(data) {
                    if (data) {
                        $scope.cities = data;
                    }
                });
            } else {
                $scope.cities = [];
            }
        }, 150);
    };

    /*
     * When user clicks a city redirect to its forecast
     * @method $scope.toForecast
     */
    $scope.toForecast = function(e) {
        var element = e.target;
        // redirect to forecast view
        $window.location.href = '#/forecast/' + element.dataset.lat + '/' + element.dataset.lng;
    };
}]);
