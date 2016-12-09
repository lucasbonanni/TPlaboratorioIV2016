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
        products: '='
      },
      templateUrl: 'templates/sideCart.html',
      link: function(scope, elements, attrs, ctrl) {
        function suma(items) {
          var total = 0;
          for (var i = 0; i < items.length; i++) {
            total += parseInt(items[i].price);
          }
          return total;
        };

        if (scope.products.length > 0) {
          scope.totalPrice = suma(scope.products);
          scope.text = 'Items in your cart';
        } else {
          scope.totalPrice = 0;
          scope.text = 'No Items in your cart';
        }

      }
    }

  });
