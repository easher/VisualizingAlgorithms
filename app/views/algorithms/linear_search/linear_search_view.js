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
        val: -1
    };
    $scope.change = function(selected) {
        $scope.finddata.val = selected
    }
}])

.directive('d3Bars', ['$window', '$timeout', 'd3Service', 'd3BarChartUtil', '$interval',
    function($window, $timeout, d3Service, d3BarChartUtil, $interval) {
        return {
            restrict: 'A',

            //binds data from controller into directive 
            scope: {
                'finddata': '=',
                'data': '='
            },

            link: function(scope, ele, attrs) {
                d3Service.d3().then(function(d3) {

                    var renderTimeout;

                    //attach svg onto the angular directive in html file
                    var svg = d3BarChartUtil.declareSVG(ele);

                    $window.onresize = function() {
                        scope.$apply();
                    };
                    //watch for change in browser window size 
                    scope.$watch(function() {
                            return angular.element($window)[0].innerWidth;
                        },

                        function() {
                            scope.render(scope.data);
                        }
                    );
                    //watch for a change in data user wants to find
                    scope.$watch('finddata', function(newValue, oldValue) {

                        function resetBarsToBlack() {
                            d3.selectAll('rect').style("fill", "black");
                        }

                        //allows us to check to make sure we are starting from a fresh interval when the user 
                        //selects a new value to search for.
                        var loop;

                        //Recursive linear search starting at index i 
                        function linearSearch(i) {

                            //leave the function so that we can reset the interval
                            if (angular.isDefined(loop)) return;

                            loop = $interval(function() {

                                if (scope.data[i] == newValue.val) {
                                    d3.select("#rect" + i).style("fill", "red");

                                    return;
                                }
                                if (i < scope.data.length) {
                                    d3.select("#rect" + i).style("fill", "blue");

                                    return linearSearch(++i);
                                }

                            }, 700, scope.data.length);
                        }

                        //reset interval
                        if (angular.isDefined(loop))
                            $interval.cancel(loop)

                        resetBarsToBlack();

                        if (newValue.val != -1)
                            linearSearch(0);


                        // $interval.cancel(loop)
                    }, true);

                    //draw bar chart
                    scope.render = function(data) {

                        if (!data) {
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