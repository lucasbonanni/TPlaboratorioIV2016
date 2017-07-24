'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */

 angular.module('tplaboratorioIv2016App')
   .controller('principalCtrl', function ($scope, orders){
    $scope.months = [];
    $scope.amounts = [];
        $scope.data = {
    labels: $scope.months,
    series: [$scope.amounts]};
    // this.createAmounts = createAmounts; 
    orders.chartInfo().then(
        function(rta){
        var array = rta.data;
        console.log(array);
        array.forEach(function(element) {
            // console.log(element);
            $scope.months.push(element.month);
            $scope.amounts.push(parseInt(element.totalamount));
        });
    },function(error){

    });



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
