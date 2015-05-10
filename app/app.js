'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.default_view',
  'myApp.version',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: 'views/default_view'});
}]);

