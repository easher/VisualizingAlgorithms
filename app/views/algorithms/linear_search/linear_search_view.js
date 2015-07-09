'use strict';

angular.module('myApp.linear_search', ['ngRoute','d3'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/views/algorithms/linear_search', {
    templateUrl: 'views/algorithms/linear_search/linear_search.html',
    controller: 'linearCtrl'
  });
}])
.directive('d3Bars', ['$window', '$timeout', 'd3Service', 
  function($window, $timeout, d3Service) {
    return {
      restrict: 'A',
      scope: {},
      link: function(scope, ele, attrs) {
        d3Service.d3().then(function(d3) {
 
          var renderTimeout;

          var svg = d3.select(ele[0])
            .append('svg')
            .style('width', '100%');
 
          $window.onresize = function() {
            scope.$apply();
          };

          // hard-code data
          scope.data = [4, 8, 15, 16, 23, 42, 33];
 
          scope.$watch(function() {
            return angular.element($window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });
 
          scope.$watch('data', function(newData) {
            scope.render(newData);
          }, true);
 		
          scope.render = function(data) {
            svg.selectAll('*').remove();
 			
            if (!data) return;
            if (renderTimeout) clearTimeout(renderTimeout);
            renderTimeout = $timeout(function() {
              

                  
                  var width = 320,
                  barHeight = 20;
                  
                  //var barHeight = d3.select(ele[0])[0][0].offsetWidth - margin,
                  //width = scope.data.length * (barWidth + barPadding);
                  var x = d3.scale.linear()
                        .domain([0,d3.max(data)])
                        .range([0,width]);

                  var chart = svg.attr("width",barHeight * data.length)
                                 .attr("height",width);

                  var bar = chart.selectAll("g")
                           .data(data)
                           .enter().append("g")

                  bar.append("rect")
                    .attr("width",barHeight-1)
                    .attr("height",function(d) {return x(d);})
                    .attr("x",function(d,i){return i*barHeight-1})
                    .attr("y",function(d,i){return width-x(d)});

            }, 200);
          };
        });
      }}
}])

.controller('linearCtrl', [function() {

}]);