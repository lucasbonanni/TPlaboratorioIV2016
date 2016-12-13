'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */
angular.module('tplaboratorioIv2016App')
  .directive('sideCart', function() {

    return {
      restrict: 'A',
      scope: {
        products: '=',
        totalprice: '@'
      },
      templateUrl: 'shop/templates/sideCart.html',
      link: function(scope, elements, attrs, ctrl) {


        if (scope.products != null && scope.products.length > 0) {
          scope.text = 'Items in your cart';
        } else {
          scope.totalprice = 0;
          scope.text = 'No Items in your cart';
        }

      }
    }

  });
