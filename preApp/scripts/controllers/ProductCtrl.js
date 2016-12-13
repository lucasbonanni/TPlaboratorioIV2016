'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */

 angular.module('tplaboratorioIv2016App')
   .controller('ProductCtrl', function ($scope){
     var carrito = [];
     var storeValues = $cookies.getObject('carrito');
     if(storeValues != null){
       carrito = storeValues;
     }

     $scope.agregarAlCarrito = function(element) {
       console.info(element);
       carrito.push(element);
       var expireDate = new Date();
       expireDate.setDate(expireDate.getDate() + 1);
       // Setting a cookie
       $cookies.putObject('carrito', carrito, {'expires': expireDate});
     };

   });
