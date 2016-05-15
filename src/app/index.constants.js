/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('savateforme')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('SAVATECONSTANTS', {
      'coups' :[{
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
      }, {
        label: "Décalage",
        type: 'coup'
      }, {
        label: "Débordement",
        type: 'coup'
      }],
      'cibles':[{
        label: "Figure",
        type: 'cible'
      }, {
        label: "Corps",
        type: 'cible'
      }, {
        label: "Bas",
        type: 'cible'
      }],
      'cotes':[{
        label: "Avant",
        type: 'cote'
      }, {
        label: "Arrière",
        type: 'cote'
      }]
    });

})();
