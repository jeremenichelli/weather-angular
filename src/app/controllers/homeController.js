app.controller('homeController', [ '$scope', '$window', 'cities', function($scope, $window, cities) {
    'use strict';

    document.body.dataset.page = 'home';

    var timer,
        searchInput = document.getElementsByClassName('search--input')[0];

    $scope.cities = [];

    /*
     * When user types list cities or navigate through results
     * @method $scope.onSearchKey
     */
    $scope.onSearchKeyUp = function(e) {
        // only trigger if not trying to navigate
        if (e.which !== 40) {
            var input = e.target;

            // clear timer
            clearTimeout(timer);

            // debounce key event
            timer = setTimeout(function() {
                if (input.value) {
                    cities(input.value, function(data) {
                        if (data.length && data.length !== 0) {
                            $scope.cities = data;
                        }
                    });
                }
            }, 200);
        }
    };

    /*
     * When user types list cities or navigate through results
     * @method $scope.onSearchKey
     */
    $scope.onSearchKeyDown = function(e) {
        // only trigger if trying to navigate
        if (e.which === 40) {
            var results = document.getElementsByClassName('search--list-result');

            if (results[0]) {
                results[0].focus();
            }
        }
    };

    /*
     * Control key events on search results
     * @method $scope.onResultKey
     */
    $scope.onResultKey = function(e) {
        var result = e.target;

        // if return pressed go to forecast
        if (e.which === 13) {
            $scope.toForecast(e);
        }

        // focus on search input
        if (e.which === 38 && !result.previousElementSibling) {
            searchInput.focus();
        }

        // focus on previous result
        if (e.which === 38 && result.previousElementSibling) {
            result.previousElementSibling.focus();
        }

        // focus on next result
        if (e.which === 40 && result.nextElementSibling) {
            result.nextElementSibling.focus();
        }
    };

    /*
     * When user clicks a city redirect to its forecast
     * @method $scope.toForecast
     */
    $scope.toForecast = function(e) {
        var element = e.target;

        document.body.classList.add('loading');

        // store city name
        window.sessionStorage.setItem('city', element.textContent);

        // redirect to forecast view
        $window.location.href = '#/forecast/' + element.dataset.lat + '/' + element.dataset.lng;
    };
}]);
