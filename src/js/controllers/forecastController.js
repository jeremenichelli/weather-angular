app.controller('forecastController', [ '$scope', '$routeParams', 'forecast',
	function($scope, $routeParams, forecast) {

        var lat = $routeParams.lat,
            lng = $routeParams.lng;

        $scope.units = window.sessionStorage.getItem('units');

        /*
	     * Toggle units that are shown
	     * @method $scope.changeUnits
	     */
        $scope.changeUnits = function() {
        	$scope.units = $scope.units === 'us' ? 'si' : 'us';
        	window.sessionStorage.setItem('units', $scope.units);
        };

        // call forecast service and attach result to $scope
        forecast(lat, lng)
            .success(function(data) {
            	$scope.place = window.sessionStorage.getItem('city');
                $scope.weather = data;
            })
}]);
