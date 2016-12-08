'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */
angular.module('tplaboratorioIv2016App')
  .directive('carouselPrincipal', function() {

    return {
      restrict: 'A',
      scope: {
        imageslist: '='
      },
      replace: true,
      templateUrl: 'templates/Carousel.html',
      link: function(scope, elements, attrs, ctrl) {

      }
    }

  });
