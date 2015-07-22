'use strict';

angular.module('myApp.linear_search')

.controller('linearCtrl', ['$scope', function($scope) {
    $scope.data = [4, 8, 15, 16, 23, 42, 33];
    $scope.finddata = {
        val: -1
    };
    $scope.change = function(selected) {
        $scope.finddata.val = selected
    }
}])