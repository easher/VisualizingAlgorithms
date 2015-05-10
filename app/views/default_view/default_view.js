'use strict';

angular.module('myApp.default_view', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/views/default_view', {
    templateUrl: 'views/default_view/default_view.html',
    controller: 'defaultCtrl'
  });
}])

.controller('defaultCtrl', [function() {

}]);