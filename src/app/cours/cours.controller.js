(function() {
  'use strict';

  angular
    .module('savateforme')
    .controller('CoursController', CoursController);

  /** @ngInject */
  function CoursController($scope, toastr, SAVATECONSTANTS, $localStorage) {
    var vm = this;

    vm.onDrop = onDrop;
    vm.onDropDisable = onDropDisable;
    vm.merge = merge;
    vm.unmerge = unmerge;
    vm.print = print;

    vm.models = {
      selected: null,
      lists: {
        "coups": SAVATECONSTANTS.coups,
        "cibles": SAVATECONSTANTS.cibles,
        "cotes": SAVATECONSTANTS.cotes
      },
      grid: {
        "combo1": [],
        "combo2": [],
        "combo3": [],
        "combo4": []
      }
    };

    var myGrid = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ];

    initModelGrid(myGrid);

    // Override datas from storage
    if ($localStorage.models != null) {
      vm.models = $localStorage.models;
    } else {
      $localStorage.models = vm.models;
    }

    function initModelGrid(grid) {
      vm.models.grid.combo1 = [];
      vm.models.grid.combo2 = [];
      vm.models.grid.combo3 = [];
      vm.models.grid.combo4 = [];
      for (var j = 0; j < grid.length; j++) {
        for (var i = 0; i < grid[j].length; i++) {

          vm.models.grid["combo" + (j + 1)].push({
            "x": i,
            "y": j,
            "list": [],
            "class": 'col-md-' + grid[j][i]
          });
        }
      }
    }

    function onDrop(list, item) {
      if (hasType(list, item.type)) {
        toastr.error('Il existe déjà un objet de type ' + item.type + ' dans ce champs', 'Erreur');
        return false;
      }

      list.push(item);
      toastr.success(item.label + ' ajouté avec succès', item.type);
      return true;
    }

    function onDropDisable() {
      return false;
    }

    function hasType(list, type) {
      var hasType = false;
      angular.forEach(list, function(item) {
        if (item.type === type) {
          hasType = true;
        }
      });
      return hasType;
    }


    function merge(coup) {
      var grid = myGrid;
      mergeCell(grid, coup.x, coup.y);
      initModelGrid(grid);
    }

    function unmerge(coup) {
      var grid = myGrid;
      unmergeCell(grid, coup.x, coup.y);
      initModelGrid(grid);
    }

    // merge la cellule (x,y) avec celle de droite
    function mergeCell(grid, x, y) {
      if (y < grid.length && x < grid[y].length - 1) {
        var cellValue = grid[y][x];
        var cellNextValue = grid[y][x + 1];

        // supprime 2 éléments à partir de l'index x, et insère la somme des valeurs des 2 cellules
        grid[y].splice(x, 2, cellValue + cellNextValue);
      }
    }

    // unmerge la cellule (x,y)
    function unmergeCell(grid, x, y) {
      if (y < grid.length && x < grid[y].length) {
        var cellValue = grid[y][x];
        if (cellValue > 1) {
          grid[y][x] = cellValue - 1;

          // Insere un element à partir de l'index x + 1, et decremente la valeur de la cellule courante
          grid[y].splice(x + 1, 0, 1);
        }
      }
    }

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
      vm.modelAsJson = angular.toJson(model, true);
    }, true);

  }
})();
