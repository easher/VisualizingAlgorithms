'use strict';

angular.module('myApp.linear_search', ['ngRoute', 'd3', 'd3BarChart'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/views/algorithms/linear_search', {
        templateUrl: 'views/algorithms/linear_search/linear_search.html',
        controller: 'linearCtrl',
        directive: 'd3Bars'
    });
}])

.controller('linearCtrl', ['$scope', function($scope) {
    $scope.data = [4, 8, 15, 16, 23, 42, 33];
    $scope.finddata = {
        val: 0
    };
    $scope.change = function(selected) {
        $scope.finddata.val = selected
    }
}])

.directive('d3Bars', ['$window', '$timeout', 'd3Service', 'd3BarChartUtil',
    function($window, $timeout, d3Service, d3BarChartUtil) {
        return {
            restrict: 'A',

            scope: {
                'finddata': '=',
                'data': '='
            },

            link: function(scope, ele, attrs) {
                d3Service.d3().then(function(d3) {

                    var renderTimeout;


                    var svg = d3BarChartUtil.declareSVG(ele);

                    $window.onresize = function() {
                        scope.$apply();
                    };

                    scope.$watch(function() {
                            return angular.element($window)[0].innerWidth;
                        },

                        function() {
                            scope.render(scope.data);
                        }
                    );

                    scope.$watch('finddata', function(newValue, oldValue) {

                        var transition = svg.transition().duration(10000);
                        var delay = function(d, i) {
                            return i * 50;
                        };
                        var allG = transition.selectAll("g").delay(delay);

                        allG.each(function(d, i) {

                            if (d == newValue.val) {
                                d3.select(this).attr("fill", "green")
                            } else {
                                d3.select(this).attr("fill", "blue");
                            }
                        });

                    }, true);

                    scope.render = function(data) {

                        if (!data) {
                            console.log("hello");
                            return;
                        }
                        if (renderTimeout) clearTimeout(renderTimeout);

                        var width = 320,
                            barHeight = 20;
                        d3BarChartUtil.drawBarChart(svg, data, width, barHeight);

                    };
                });
            }
        }
    }
]);