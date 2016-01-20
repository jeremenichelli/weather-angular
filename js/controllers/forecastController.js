app.controller('forecastController', [ '$scope', '$routeParams', 'forecast',
    function($scope, $routeParams, forecast) {
        var lat = $routeParams.lat,
            lng = $routeParams.lng;

        $scope.status = 'waiting..';

        forecast(lat, lng)
            .success(function(data) {
                console.log(data);
                $scope.status = 'done!';
            })
}]);
