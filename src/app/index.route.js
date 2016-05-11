(function() {
  'use strict';

  angular
    .module('savateforme')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('myapp', {
          views: {
            'header': {
              templateUrl: 'app/main/header.html',
              controller:'MainController',
              controllerAs: 'main'
            },
            'content': {
              template:'<div ui-view></div>'
            },
            'footer': {
              templateUrl: 'app/main/footer.html',
              controller:'MainController',
              controllerAs: 'main'
            }
         }
     })
      .state('myapp.home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('myapp.cours', {
        url: '/cours',
        templateUrl: 'app/cours/cours.html',
        controller: 'CoursController',
        controllerAs: 'cours'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
