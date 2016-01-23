app.controller('forecastController', [ '$scope', '$routeParams', 'forecast',
    function($scope, $routeParams, forecast) {
        'use strict';

        document.body.dataset.page = 'forecast';

        var lat = $routeParams.lat,
            lng = $routeParams.lng;

        $scope.units = window.localStorage.getItem('units');

        /*
         * Toggle units that are shown
         * @method $scope.changeUnits
         */
        $scope.changeUnits = function(e) {
            e.preventDefault();
            $scope.units = $scope.units === 'us' ? 'si' : 'us';
            window.localStorage.setItem('units', $scope.units);
        };

        // call forecast service and attach result to $scope
        forecast(lat, lng)
            .success(function(data) {
                $scope.place = window.sessionStorage.getItem('city');
                $scope.weather = data;

                document.body.classList.remove('loading');
            });
}]);
