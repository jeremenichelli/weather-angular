app.factory('cities', [ function() {

	/*
	 * Returns array with city results from google Maps API service
	 * @method getCities
	 */
	var getCities = function(query, fn) {
		geocoder.geocode({ 'address': query }, function(results, status) {
	        if (status === google.maps.GeocoderStatus.OK) {
	        	// filter only localities
	            results = results.filter(function(place) {
	                // parse coords
	                place.geometry.location.lat = place.geometry.location.lat();
	                place.geometry.location.lng = place.geometry.location.lng();

	                return ~place.types.indexOf('locality');
	            });

	            fn(results);
	        } else {
	        	fn([]);
	        }
	    });
	};

	return getCities;
}]);