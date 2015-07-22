'use strict';

describe('myApp.linear_search module', function() {

  beforeEach(module('myApp.linear_search'));

  //Unit tests for linear controller functionality
  describe('linear controller', function(){
  	
  	
  	var scope;
    it('should be defined', inject(function($controller,$rootScope) {
    
    	scope = $rootScope.$new();  
		var linearControler = $controller('linearCtrl',{$scope:scope});
      
      	expect(linearControler).toBeDefined();
    
    }));


    it('scope.finddata.val should equal 10', inject(function($controller,$rootScope) {
    
    	scope = $rootScope.$new();  
		var linearControler = $controller('linearCtrl',{$scope:scope});
      
		scope.change(10);
		expect(scope.finddata.val).toEqual(10);

    }));

  });

});