app.controller('forecastController', [ '$scope', '$routeParams', function($scope, $routeParams) {
	$scope.lat = $routeParams.lat;
	$scope.lon = $routeParams.lng;
}]);
