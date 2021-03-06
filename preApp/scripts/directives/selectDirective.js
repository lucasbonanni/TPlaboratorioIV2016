'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */
angular.module('tplaboratorioIv2016App')
  .directive('selectJs', function() {

    return {
      restrict: 'A',
      scope: {
        items: '=',
        text: '@'
      },
      replace: true,
      templateUrl: 'scripts/directives/Templates/select.html',
      link: function(scope, elements, attrs, ctrl) {
      }
    }

  });
