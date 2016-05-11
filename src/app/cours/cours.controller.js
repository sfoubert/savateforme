(function() {
  'use strict';

  angular
    .module('savateforme')
    .controller('CoursController', CoursController);

  /** @ngInject */
  function CoursController($scope, $log) {
    var vm = this;

    vm.message = 'par seb';

    $scope.models = {
        selected: null,
        lists: {"A": [], "B": []}
    };

    // Generate initial model
    for (var i = 1; i <= 3; ++i) {
        $scope.models.lists.A.push({label: "Item A" + i});
        $scope.models.lists.B.push({label: "Item B" + i});
    }

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

  }
})();
