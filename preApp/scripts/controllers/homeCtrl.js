'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */

angular.module('tplaboratorioIv2016App')
  .controller('HomeCtrl', function($scope, $cookies) {
    $scope.carrito = [];
    $scope.totalPrice = 0;
    $scope.groupFilter = {};
    $scope.actualPage = 1;
    $scope.printNumber = function (){
      console.info("print number");
      console.info("controller page number",$scope.actualPage);
    };


    $scope.totalItems = 64;
    $scope.currentPage = 4;
    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      console.log('Page changed to: ' + $scope.bigCurrentPage);
    };
    $scope.comboValue = "Desc";
    $scope.comboChanged = function (val) {
      $scope.comboValue = val;
    }

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;


    console.info($scope.groupFilter);
    $scope.storedValues = $cookies.getObject('carrito');
    if ($scope.storedValues != null) {
      $scope.carrito = $scope.storedValues;
      $scope.totalPrice = buildOrder($scope.storedValues);
    }


    function buildOrder(array) {
      var arrayOrdenado = [];
      $scope.totalPrice = 0;
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
          $scope.totalPrice += parseInt(array[i].price) * 1.21;
        }
        console.info("totalprice", $scope.totalPrice);
        return $scope.totalPrice;
      }
    };

    $scope.productList = [{
      'id': '1',
      'name': 'Product name 1',
      'description': 'Lorem Ipsum is simply dummy text',
      'price': '222',
      'image': 'shop/themes/images/products/6.jpg',
      'group': 'memory'
    }, {
      'id': '2',
      'name': 'Product name 2',
      'description': 'Lorem Ipsum is simply dummy text',
      'price': '222',
      'image': 'shop/themes/images/products/7.jpg',
      'group': 'pendrive'
    }, {
      'id': '3',
      'name': 'Product name 3',
      'description': 'Lorem Ipsum is simply dummy text',
      'price': '222',
      'image': 'shop/themes/images/products/8.jpg',
      'group': 'memory'
    }, {
      'id': '4',
      'name': 'Product name 4',
      'description': 'Lorem Ipsum is simply dummy text',
      'price': '222',
      'image': 'shop/themes/images/products/9.jpg',
      'group': 'camera'
    }, {
      'id': '5',
      'name': 'Product name 5',
      'description': 'Lorem Ipsum is simply dummy text',
      'price': '222',
      'image': 'shop/themes/images/products/10.jpg',
      'group': 'memory'
    }, {
      'id': '6',
      'name': 'Product name 6',
      'description': 'Lorem Ipsum is simply dummy text',
      'price': '222',
      'image': 'shop/themes/images/products/11.jpg',
      'group': 'camera'
    }];

    $scope.carouselImages = [{
      'image': 'shop/themes/images/carousel/1.png',
      'label': 'Second Thumbnail label',
      'description': 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.'
    }, {
      'image': 'shop/themes/images/carousel/2.png',
      'label': 'Second Thumbnail label',
      'description': 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.'
    }, {
      'image': 'shop/themes/images/carousel/3.png',
      'label': 'Second Thumbnail label',
      'description': 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.'
    }, {
      'image': 'shop/themes/images/carousel/4.png',
      'label': 'Second Thumbnail label',
      'description': 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.'
    }, {
      'image': 'shop/themes/images/carousel/5.png',
      'label': 'Second Thumbnail label',
      'description': 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.'
    }, {
      'image': 'shop/themes/images/carousel/6.png',
      'label': 'Second Thumbnail label',
      'description': 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.'
    }];

    $scope.setFilter = function () {
      $scope.groupFilter = { 'group':'memory'};
      console.info($scope.groupFilter);
    };

    $scope.agregarAlCarrito = function(element) {
      $scope.carrito.push(element);
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
      // Setting a cookie
      $cookies.putObject('carrito', $scope.carrito, {
        'expires': expireDate
      });
      buildOrder($scope.carrito);
    };





  });
