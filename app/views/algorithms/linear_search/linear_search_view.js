'use strict';

angular.module('myApp.linear_search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/views/algorithms/linear_search', {
    templateUrl: 'views/algorithms/linear_search/linear_search.html',
    controller: 'linearCtrl'
  });
}])

.controller('linearCtrl', [function() {

}]);