'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */

 angular.module('tplaboratorioIv2016App')
   .controller('ProductCtrl', function ($scope,$cookies,productos,$state){
     var carrito = [];
     $scope.slides = [{id:1,image:'',text:''},{id:2,image:'',text:''},{id:3,image:'',text:''}];
     $scope.cartCantidad = 0;
     $scope.product = {};
     var productId = $state.params['id'];


     productos.BuscarPorId(productId).then(function(response){
       $scope.product = response.data;

       console.info($scope.product);
       $scope.slides.push({
          image:response.data.image1,
          text:'a',
          id:4
        });
        $scope.slides.push({
          image:response.data.image2,
          text:'b',
          id:5
        });
        $scope.slides.push({
          image:response.data.image3,
          text:'c',
          id:6
        });
        // $scope.$apply();
       $('a[rel*=lightbox]').lightBox();
     });

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


    //  $scope.slides.push({
    //       image:'http://localhost/personaslim/uploads/2727-large.jpg' ,
    //       text:'asdfasf',
    //       id:0
    //     });
    //     $scope.slides.push({
    //       image:'http://localhost/personaslim/uploads/2728-large.jpg' ,
    //       text:'asdfasdf',
    //       id:1
    //     });
    //     $scope.slides.push({
    //       image:'http://localhost/personaslim/uploads/2729-large.jpg' ,
    //       text:'asdfsaf',
    //       id:2
    //     });

    

    //  $scope.product ={
    //         "id":1,
    //         "nombre": "Cox",
    //         "descripcion": "Carney",
    //         "banda":"banda",
    //         "cantidad":50,
    //         "precio": "10",
    //         "tipo": "Enormo",
    //         "descuento": true,
    //         "data": $scope.slides
    //     };
        
        /***** carousel  */


         $scope.myInterval = 3000;
          $scope.noWrapSlides = false;
          $scope.active = 0;
          var currIndex = 0;


          console.info($scope.slides);
   });
