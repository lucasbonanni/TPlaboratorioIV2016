'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */

angular.module('tplaboratorioIv2016App')
  .controller('HomeCtrl', function($scope) {
    $scope.productList = [{
      'name': 'Product name 1',
      'description': 'Lorem Ipsum is simply dummy text',
      'price': '222',
      'image': 'styles/shop/themes/images/products/6.jpg'
    }, {
      'name': 'Product name 2',
      'description': 'Lorem Ipsum is simply dummy text',
      'price': '222',
      'image': 'styles/shop/themes/images/products/7.jpg'
    }, {
      'name': 'Product name 3',
      'description': 'Lorem Ipsum is simply dummy text',
      'price': '222',
      'image': 'styles/shop/themes/images/products/8.jpg'
    }, {
      'name': 'Product name 4',
      'description': 'Lorem Ipsum is simply dummy text',
      'price': '222',
      'image': 'styles/shop/themes/images/products/9.jpg'
    }, {
      'name': 'Product name 5',
      'description': 'Lorem Ipsum is simply dummy text',
      'price': '222',
      'image': 'styles/shop/themes/images/products/10.jpg'
    }, {
      'name': 'Product name 6',
      'description': 'Lorem Ipsum is simply dummy text',
      'price': '222',
      'image': 'styles/shop/themes/images/products/11.jpg'
    }]
  });
