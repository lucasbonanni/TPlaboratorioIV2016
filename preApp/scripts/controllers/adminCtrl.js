'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */

 angular.module('tplaboratorioIv2016App')
   .controller('principalCtrl', function ($scope){

    $scope.data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
          [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8]
      ]
    };

    $scope.options = {
        seriesBarDistance: 10,
        height:'300px'
    };

    $scope.responsiveOptions = [
        ['screen and (max-width: 640px)', {
            seriesBarDistance: 1,
            axisX: {
                labelInterpolationFnc: function(value) {
                    return value[0];
                }
            }
        }]
    ];

   });
