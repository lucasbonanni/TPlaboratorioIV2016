'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */

angular.module('tplaboratorioIv2016App')
  .controller('ProductSummaryCtrl', function($scope, $cookies) {
    $scope.carrito = [];
    $scope.discount = 0;
    $scope.tax = 1.10;
    $scope.totalPrice = 0;
    $scope.totalDiscount = 0;
    $scope.totalTax = 0;
    $scope.storedValues = $cookies.getObject('carrito');
    if ($scope.storedValues != null) {
      $scope.carrito = buildOrder($scope.storedValues);
    }

    $scope.isloged = false;

    $scope.increase = function(element) {
      $scope.storedValues.push(element);
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
      // Setting a cookie
      $cookies.putObject('carrito', $scope.storedValues, {
        'expires': expireDate
      });
      $scope.carrito = buildOrder($scope.storedValues);
    };

    $scope.decrease = function(id) {
      var index;
      for (var i = $scope.storedValues.length -1; i >= 0; i--) {
        if ($scope.storedValues[i].id == id) {
          index = i;
          break;
        }
      }
      $scope.storedValues.splice(index, 1);
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
      // Setting a cookie
      $cookies.putObject('carrito', $scope.storedValues, {
        'expires': expireDate
      });
      $scope.carrito = buildOrder($scope.storedValues);
    };


    $scope.delete = function(id) {
      var newArray = [];
      for (var i = 0; i < $scope.storedValues.length; i++) {
        if (!($scope.storedValues[i].id == id)) {
          newArray.push($scope.storedValues[i]);
        }
      }
      $scope.storedValues = newArray;
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
      // Setting a cookie
      $cookies.putObject('carrito', $scope.storedValues, {
        'expires': expireDate
      });
      $scope.carrito = buildOrder($scope.storedValues);
    };

    //build order with the cookie information
    function buildOrder(array) {
      var arrayOrdenado = [];
      $scope.totalPrice = 0;
      $scope.totalDiscount = 0;
      $scope.totalTax = 0;
      if (array.length > 0) {
        for (var i = 0; i < array.length; i++) {
          var found = false;
          if (i == 0) {
            array[i].quantity = 1;
            arrayOrdenado.push(array[i]);
          } else {
            for (var j = 0; j < arrayOrdenado.length; j++) {
              if (array[i].id == arrayOrdenado[j].id) {
                arrayOrdenado[j].quantity++;
                found = true;
              }
            }
            if (!found) {
              array[i].quantity = 1;
              arrayOrdenado.push(array[i]);
            }
          }
          $scope.totalPrice += parseInt(array[i].price);
          // $scope.totalDiscount += parseInt(array[i].discount);
          $scope.totalDiscount = 0;
          $scope.totalTax += (parseInt(array[i].price) * $scope.tax) - parseInt(array[i].price);
        }
        return arrayOrdenado;
      }
    };

  });
