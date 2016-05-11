(function() {
  'use strict';

  angular
    .module('savateforme')
    .controller('CoursController', CoursController);

  /** @ngInject */
  function CoursController($scope) {
    var vm = this;

    vm.message = 'par seb';

    vm.models = {
      selected: null,
      lists: {
        "A": [],
        "B": []
      },
      grid: {
        "combo1": [],
        "combo2": [],
        "combo3": [],
        "combo4": []
      }
    };

    // Generate initial model
    for (var i = 1; i <= 3; ++i) {
      vm.models.lists.A.push({
        label: "Item A" + i
      });
      vm.models.lists.B.push({
        label: "Item B" + i
      });
    }

    for (var k = 0; k < 8; k++) {
      for (var j = 1; j <= 4; j++) {
        vm.models.grid["combo" + j].push({
          "id": k,
          "list": []
        });
      }
    }

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
      vm.modelAsJson = angular.toJson(model, true);
    }, true);

  }
})();
