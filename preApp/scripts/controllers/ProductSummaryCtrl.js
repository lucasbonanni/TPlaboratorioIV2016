'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */

angular.module('tplaboratorioIv2016App')
  .controller('ProductSummaryCtrl', function($scope, $cookies,NgMap,servicioLogin,$state, orders, orderDetail,shop) {
    $scope.usuario = {};
    $scope.cliente = cliente;
    $scope.empleado = empleado;
    $scope.encargado = encargado;
    $scope.administrador = administrador;
    $scope.loguarse = loguarse;
    $scope.carrito = [];
    $scope.discount = 0;
    $scope.tax = 1.10;
    $scope.totalPrice = 0;
    $scope.totalDiscount = 0;
    $scope.totalTax = 0;
    $scope.direction = '';
    $scope.MejorDistancia = MejorDistancia;
    $scope.originDirection = '';
    $scope.directionOrigin = '';
    $scope.directionDestination = '';
    $scope.showDistance = '';
    $scope.distanceValue = 0;
    $scope.isLoged = servicioLogin.isAuthenticated();
    $scope.name = '';
    $scope.userId = 0;
    $scope.producto = {};
    $scope.positions = [];
    if($scope.isLoged){
       var payload = servicioLogin.getPayload()
       $scope.name = payload.name;
       $scope.userId = payload.id;
    }
    shop.obtenerTodos().then(function(rta){
      $scope.shops = rta.data;
      $scope.shops.forEach(function(element) {
        var street = element.street + ',' + element.city;
        $scope.positions.push(street);
      });

    },function (error){
        $scope.positions = [];
        $scope.positions.push([-34.605044, -58.382430]);
        $scope.positions.push([-34.608779, -58.436673]);
        $scope.positions.push([-34.552305, -58.451438]);
    });
    //$scope.lat = -34.605044, $scope.lng = -58.382430;
    $scope.lat = -34.577877; $scope.lng = -58.427484;
    //-34.577877, -58.427484
    $scope.storedValues = [];
    
    ///get the stored values
    $scope.storedValues = $cookies.getObject('carrito');
    if ($scope.storedValues != null) {
      $scope.carrito = buildOrder($scope.storedValues);
    }

    //get the current location
    navigator.geolocation.getCurrentPosition(function (position) {
                $scope.lat = position.coords.latitude;
                $scope.lng = position.coords.longitude;
    });


    $scope.increase = function(element) {
      $scope.storedValues.push(element);
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
      // Setting a cookie
      $cookies.putObject('carrito', $scope.storedValues, {
        'expires': expireDate
      });
      $scope.carrito = buildOrder($scope.storedValues);
    };

    $scope.decrease = function(id) {
      var index;
      for (var i = $scope.storedValues.length -1; i >= 0; i--) {
        if ($scope.storedValues[i].id == id) {
          index = i;
          break;
        }
      }
      $scope.storedValues.splice(index, 1);
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
      // Setting a cookie
      $cookies.putObject('carrito', $scope.storedValues, {
        'expires': expireDate
      });
      $scope.carrito = buildOrder($scope.storedValues);
    };


    $scope.delete = function(id) {
      var newArray = [];
      for (var i = 0; i < $scope.storedValues.length; i++) {
        if (!($scope.storedValues[i].id == id)) {
          newArray.push($scope.storedValues[i]);
        }
      }
      $scope.storedValues = newArray;
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
      // Setting a cookie
      $cookies.putObject('carrito', $scope.storedValues, {
        'expires': expireDate
      });
      $scope.carrito = buildOrder($scope.storedValues);
    };

    //build order with the cookie information
    function buildOrder(array) {
      var arrayOrdenado = [];
      $scope.totalPrice = 0;
      $scope.totalDiscount = 0;
      $scope.totalTax = 0;
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
          $scope.totalPrice += parseInt(array[i].price);
          // $scope.totalDiscount += parseInt(array[i].discount);
          $scope.totalDiscount = 0;
          $scope.totalTax += (parseInt(array[i].price) * $scope.tax) - parseInt(array[i].price);
        }
        return arrayOrdenado;
      }
    };



    /* mapa */
      NgMap.getMap().then(function(map) {
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);

      map.getCenter()
    });



    function loguarse(){
        servicioLogin.doLogin($scope.usuario).then (function(rta){
          $state.reload();
        }, function(error){
          servicioLogin.doLogin($scope.usuario).then (function(rta){
            $state.reload();
          }, function(error){
            alert(error);
          });
        });
      }

    function MejorDistancia(){
        
        // var origin2 = 'Greenwich, England';
        // var destinationA = new google.maps.LatLng(-34.605044, -58.382430);
        // var destinationB = new google.maps.LatLng(-34.608779, -58.436673);
        // var destinationC = new google.maps.LatLng(-34.552305, -58.451438);
        var origins = [];
        if($scope.direction === ''){
          var origin1 = new google.maps.LatLng($scope.lat, $scope.lng);
          origins.push(origin1);
        }
        else if($scope.direction !== ''){
          origins.push($scope.direction);
        }
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: $scope.positions,
            destinations: origins,
            travelMode: 'DRIVING',
          }, callback);

        function callback(response, status) {
          // See Parsing the Results for
          // the basics of a callback function.
          console.info("response",response);
          var distance1 = response.rows[0].elements[0].distance.value;
          var distance2 = response.rows[1].elements[0].distance.value;
          var distance3 = response.rows[2].elements[0].distance.value;
          var distanceArray = [];
          distanceArray.push(distance1);
          distanceArray.push(distance2);
          distanceArray.push(distance3);
          var min = Math.min.apply(Math,distanceArray);
          $scope.directionDestination = $scope.direction;
          
          if(min === distance1){
            $scope.directionOrigin = response.originAddresses[0];
            $scope.showDistance = response.rows[0].elements[0].distance.text;
            $scope.distanceValue = distance1;
          }else if ( min === distance2){
            $scope.directionOrigin = response.originAddresses[1];
            $scope.showDistance = response.rows[1].elements[0].distance.text;
            $scope.distanceValue = distance2;
          } else if ( min === distance3){
            $scope.directionOrigin = response.originAddresses[0];
            $scope.showDistance = response.rows[2].elements[0].distance.text;
            $scope.distanceValue = distance3;
          }
          $scope.$apply();
          console.info("distance",$scope.showDistance,$scope.distanceValue);
        }
    }


    // $scope.positions = [];

    // $scope.positions.push([-34.605044, -58.382430]);
    // $scope.positions.push([-34.608779, -58.436673]);
    // $scope.positions.push([-34.552305, -58.451438]);

    //  $scope.mapMarkers.push({
    //     title: 'Hola',
    //     iconUrl: '<i class="glyphicon glyphicon-arrow-down"></i>',
    //     lat: '-34.605044',
    //     lon: '-58.382430'
    //   });
      ///-34.605044, -58.382430
      //-34.608779, -58.436673
      //-34.552305, -58.451438

        function cliente() {
            $scope.usuario.email = 'jfollis0@blogtalkradio.com';
            $scope.usuario.password = '123456';
        }

        function empleado() {
            $scope.usuario.email = 'balliband8@reddit.com';
            $scope.usuario.password = '6496';
        }

        function encargado() {
            $scope.usuario.email = 'amerigot1@bravesites.com';
            $scope.usuario.password = '53507';
        }

        function administrador() {
            $scope.usuario.email = 'nstollmeyer2@zimbio.com';
            $scope.usuario.password = '83790';
        }
          
        $scope.createOrUpdate = function () {
          var expireDate = new Date();
            $scope.producto.userId = $scope.userId;
            $scope.producto.totalPrice = $scope.totalPrice;
            $scope.producto.userName = $scope.name;
            $scope.producto.date = new Date();
            $scope.producto.userStreet = $scope.direction;
            orders.Agregar($scope.producto).then(function (respuesta) {
                $scope.carrito.forEach(function(element) {
                    console.info( respuesta.data);
                    element.orderId = respuesta.data.id;
                    orderDetail.Agregar(element).then(function(rst){
                        // continue;
                    },
                    function(error){
                        orderDetail.Agregar(element).then(function(rta){
                            // continue;
                        },
                        function(error){

                        });
                    });
                });
                $cookies.putObject('carrito', {}, {
                  'expires': expireDate
                });
                $state.go('shop.home');
            });

            
        };

  });
