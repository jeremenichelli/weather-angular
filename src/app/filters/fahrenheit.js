app.filter('fahrenheit', function() {
	return function(temp) {
		return Math.round(temp * 9 / 5 + 32);
	}	
});
