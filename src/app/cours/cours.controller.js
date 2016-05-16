(function() {
  'use strict';

  angular
    .module('savateforme')
    .controller('CoursController', CoursController);

  /** @ngInject */
  function CoursController($scope, toastr, SAVATECONSTANTS, $localStorage, $log) {
    var vm = this;

    var enableLocalStorage = true;

    vm.onDrop = onDrop;
    vm.onDropDisable = onDropDisable;
    vm.merge = merge;
    vm.unmerge = unmerge;
    vm.deleteAll = deleteAll;

    var defaultModels = {
      selected: null,
      lists: {
        "coups": SAVATECONSTANTS.coups,
        "cibles": SAVATECONSTANTS.cibles,
        "cotes": SAVATECONSTANTS.cotes
      },
      grid: {
        "combo1": {
          "observations": "",
          "coups": []
        },
        "combo2": {
          "observations": "",
          "coups": []
        },
        "combo3": {
          "observations": "",
          "coups": []
        },
        "combo4": {
          "observations": "",
          "coups": []
        }
      }
    };
    vm.models = JSON.parse(JSON.stringify(defaultModels));

    var defaultGrid = [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ];
    var myGrid = JSON.parse(JSON.stringify(defaultGrid));

    // Override datas from storage
    if (enableLocalStorage === true) {
      if ($localStorage.myGrid != null) {
        myGrid = $localStorage.myGrid;
      } else {
        $localStorage.myGrid = myGrid;
      }
    }

    initModelGrid(myGrid);

    // Override datas from storage
    if (enableLocalStorage === true) {
      if ($localStorage.modelsGrid != null) {
        vm.models.grid = $localStorage.modelsGrid;
      } else {
        $localStorage.modelsGrid = vm.models.grid;
      }
    }

    function initModelGrid(grid) {
      for (var j = 0; j < grid.length; j++) {
        for (var i = 0; i < grid[j].length; i++) {
          vm.models.grid["combo" + (j + 1)].coups.push({
            "x": i,
            "y": j,
            "list": [],
            "class": 'col-md-' + grid[j][i]
          });
        }
      }
    }

    function refreshModelGrid(grid, action, x, y) {
      var update = false;
      var currentCoups = vm.models.grid["combo" + (y + 1)].coups;
      if (action === 'merge') {
        if (y < 4 && x < currentCoups.length - 1) {
          currentCoups.splice(x + 1, 1);
          update = true;
        }
      } else if (action === 'unmerge') {
        if (y < 4 && x < currentCoups.length) {
          if (currentCoups[x].class !== 'col-md-1') {
            var newCoup = {
              "x": x + 1,
              "y": y,
              "list": [],
              "class": 'col-md-1'
            };
            currentCoups.splice(x + 1, 0, newCoup);
            update = true;
          }
        }
      }

      if (update === true) {
        for (var j = 0; j < grid.length; j++) {
          currentCoups = vm.models.grid["combo" + (j + 1)].coups;
          for (var i = 0; i < grid[j].length; i++) {
            var currentCoup = currentCoups[i];
            currentCoup.x = i;
            currentCoup.y = j;
            currentCoup.class = 'col-md-' + grid[j][i];
          }
        }
      }
      //$log.log('currentCoups : ', currentCoups);
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
      refreshModelGrid(grid, 'merge', coup.x, coup.y);
    }

    function unmerge(coup) {
      var grid = myGrid;
      unmergeCell(grid, coup.x, coup.y);
      refreshModelGrid(grid, 'unmerge', coup.x, coup.y);
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

    function deleteAll() {
      myGrid = defaultGrid;
      vm.models = defaultModels;

      if (enableLocalStorage === true) {
        $localStorage.myGrid = defaultGrid;
        $localStorage.modelsGrid = defaultModels;
      }
    }

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
      vm.modelAsJson = angular.toJson(model, true);
    }, true);

  }
})();
