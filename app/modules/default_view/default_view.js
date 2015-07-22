'use strict';

angular.module('myApp.default_view', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/modules/default_view', {
    templateUrl: 'modules/default_view/default_view.html',
    controller: 'defaultCtrl'
  });
}])

.controller('defaultCtrl', [function() {

}]);