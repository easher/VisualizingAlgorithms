angular.module('d3BarChart', [])
    
    .factory('d3BarChartUtil', [function () {
        return {
            declareSVG: function (ele) {
                	    var svg = d3.select(ele[0])
            				.append('svg')
            				.style('width', '100%');
            			
            				return svg;
            },

            drawBarChart: function(svg,data,width,height) {

            			svg.selectAll('*').remove();
                  
                  		var x = d3.scale.linear()
                        		.domain([0,d3.max(data)])
                        		.range([0,width]);

                  		var chart = svg.attr("width",height * data.length)
                                .attr("height",width);

                  		var bar = chart.selectAll("g")
                        		.data(data)
                        		.enter().append("g")

                  		bar.append("rect")
                    			.attr("width",height-1)
                    			.attr("height",function(d) {return x(d);})
                    			.attr("x",function(d,i){return i*height-1})
                    			.attr("y",function(d,i){return width-x(d)})
                                .attr("id",function(d,i){return "rect"+i});
            }
        }
    }]);
