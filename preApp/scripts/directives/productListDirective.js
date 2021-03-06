'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */
angular.module('tplaboratorioIv2016App')
  .directive('productList', function() {

    return {
      restrict: 'A',
      scope: {
        products: '=',
        title: '@',
        addtocart: '&',
        groupfilter: '='
      },
      replace: true,
      templateUrl: 'shop/templates/productList.html',
      link: function(scope, elements, attrs, ctrl) {
        console.info("directive",scope.groupfilter);
      }
    }

  });
