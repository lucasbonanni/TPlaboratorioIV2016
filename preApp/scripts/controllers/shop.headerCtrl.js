'use strict';

angular.module('tplaboratorioIv2016App')
  .controller('shopHeaderCtrl', function ($scope) {
    $scope.items = 10;
    $scope.totalprice = 100;
    $scope.navMenuItems = [];
    var isAdmin = false;
    var isEnc = false;
    var isEmp = false;
    var isClient = true;
    var isLogin = true;


      var invitedMenu = [{
                text: 'Principal',
                state: 'shop.home',
                iconClass: 'fa fa-tachometer'
            },
            {
                text: 'Login',
                state: 'shop.login',
                iconClass: 'fa fa-building'
            },

            {
                text: 'Encuesta',
                state: 'shop.contact',
                iconClass: 'fa fa-truck'
            }
        ];

      var clientMenu = [{
                text: 'Principal',
                state: 'shop.home',
                iconClass: 'fa fa-tachometer'
            },
            {
                text: 'Resumen',
                state: 'shop.summary',
                iconClass: 'fa fa-building'
            },

            {
                text: 'Encuesta',
                state: 'shop.contact',
                iconClass: 'fa fa-truck'
            }
        ];

        var adminMenu = [{
                text: 'Principal',
                state: 'shop.home',
                iconClass: 'fa fa-tachometer'
            },
            {
                text: 'Encuesta',
                state: 'shop.contact',
                iconClass: 'fa fa-truck'
            },
            {
                text: 'Administración',
                state: 'admin.dashboard',
                iconClass: 'fa fa-users'
            }
        ];

    var adminAcces = $scope.isAdmin || $scope.isEnc || $scope.isClient;

    /*
      console.info($scope.isAdmin || $scope.isEnc || $scope.isClient);
      console.info("invitado",!$scope.isLogin && !adminAcces);
      console.info("cliente",$scope.isLogin && !adminAcces);
      console.info("admin", $scope.isLogin && adminAcces);*/

      if (!isLogin && !adminAcces) {
          $scope.navMenuItems = invitedMenu;
      } else if (isLogin && !adminAcces) {
          $scope.navMenuItems = clientMenu;
      } else if (isLogin && adminAcces) {
          $scope.navMenuItems = adminMenu;
      }
      

    });
