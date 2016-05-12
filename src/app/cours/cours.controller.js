(function() {
  'use strict';

  angular
    .module('savateforme')
    .controller('CoursController', CoursController);

  /** @ngInject */
  function CoursController($scope, toastr) {
    var vm = this;

    vm.onDrop = onDrop;
    vm.message = 'par seb';


    vm.models = {
      selected: null,
      lists: {
        "coups": [{
          label: "Direct",
          type: 'coup'
        }, {
          label: "Crochet",
          type: 'coup'
        }, {
          label: "Uppercut",
          type: 'coup'
        }, {
          label: "Fouetté",
          type: 'coup'
        }, {
          label: "Chassé frontal",
          type: 'coup'
        }, {
          label: "Chassé latéral",
          type: 'coup'
        }, {
          label: "Revers frontal",
          type: 'coup'
        }, {
          label: "Revers latéral",
          type: 'coup'
        }],
        "cibles": [{
          label: "Figure",
          type: 'cible'
        }, {
          label: "Corps",
          type: 'cible'
        }, {
          label: "Bas",
          type: 'cible'
        }],
        "cotes": [{
          label: "Avant",
          type: 'cote'
        }, {
          label: "Arrière",
          type: 'cote'
        }]
      },
      grid: {
        "combo1": [],
        "combo2": [],
        "combo3": [],
        "combo4": []
      }
    };

    initGrid();

    function initGrid() {
      for (var k = 0; k < 8; k++) {
        for (var j = 1; j <= 4; j++) {
          vm.models.grid["combo" + j].push({
            "id": k,
            "list": []
          });
        }
      }
    }

    function onDrop(list, item) {
      if(hasType(list, item.type)){
        toastr.error('Il existe déjà un objet de type ' + item.type + ' dans ce champs', 'Erreur');
        return false;
      }

      list.push(item);
      toastr.success(item.label + ' ajouté avec succès', item.type);
      return true;
    }

    function hasType(list, type) {
      var hasType = false;
      angular.forEach(list, function(item) {
        if(item.type === type){
          hasType = true;
        }
      });
      return hasType;
    }

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
      vm.modelAsJson = angular.toJson(model, true);
    }, true);

  }
})();
