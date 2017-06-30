'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */

 angular.module('tplaboratorioIv2016App')
   .controller('ProductCtrl', function ($scope,$cookies){
     var carrito = [];
     $scope.slides = [];
     $scope.cartCantidad = 0;

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


     $scope.slides.push({
          image:'shop/themes/images/products/large/f1.jpg' ,
          text:'asdfasf',
          id:0
        });
        $scope.slides.push({
          image:'shop/themes/images/products/large/f2.jpg' ,
          text:'asdfasdf',
          id:1
        });
        $scope.slides.push({
          image:'shop/themes/images/products/large/f3.jpg' ,
          text:'asdfsaf',
          id:2
        });

    

     $scope.product ={
            "id":1,
            "nombre": "Cox",
            "descripcion": "Carney",
            "banda":"banda",
            "cantidad":50,
            "precio": "10",
            "tipo": "Enormo",
            "descuento": true,
            "data": $scope.slides
        };
        
        /***** carousel  */


         $scope.myInterval = 3000;
          $scope.noWrapSlides = false;
          $scope.active = 0;
          var currIndex = 0;


          console.info($scope.slides);
   });
