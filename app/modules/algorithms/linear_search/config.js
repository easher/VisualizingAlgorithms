'use strict';

angular.module('myApp.linear_search', ['ngRoute', 'd3', 'd3BarChart'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/modules/algorithms/linear_search', {
        templateUrl: 'modules/algorithms/linear_search/template.html',
        controller: 'linearCtrl',
        directive: 'd3Bars'
    });
}]);