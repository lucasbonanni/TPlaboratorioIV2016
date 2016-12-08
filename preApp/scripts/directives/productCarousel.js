'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */
 angular.module('tplaboratorioIv2016App')
   .directive('productCarousel', function (){

     return{
       restrict: 'A',
       scope:{
         products:'=',
         title:'@'
       },
       replace: true,
       templateUrl:'templates/productsCarousel.html',
       link: function( scope, elements, attrs, ctrl){

       }
     }

   });
