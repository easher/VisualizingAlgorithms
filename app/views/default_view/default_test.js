'use strict';

describe('myApp.default_view module', function() {

  beforeEach(module('myApp.default_view'));

  describe('view1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var defaultCtrl = $controller('defaultCtrl');
      expect(defaultCtrl).toBeDefined();
    }));

  });
});