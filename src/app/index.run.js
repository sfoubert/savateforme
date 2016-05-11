(function() {
  'use strict';

  angular
    .module('savateforme')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
