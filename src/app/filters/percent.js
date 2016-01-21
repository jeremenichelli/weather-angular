app.filter('percent', function() {
	return function(num) {
		return Math.round(num * 100);
	};
});
