'use strict';
 
 angular
    .module('tplaboratorioIv2016App')
    .service('servicioLogin', function ($cookies) {
        this.cartElements = [];
        this.totalPrice = 0;

        this.cart = {
            cartElements: this.cartElements,
            totalprice: this.totalPrice
        };

        

        this.agregarAlCarrito = function(element) {
            this.cartElements.push(element);
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            // Setting a cookie
            $cookies.putObject('carrito', this.cartElements, {
                'expires': expireDate
            });
            buildOrder(this.cartElements);
            return this.cart;
        };


        this.buildOrder = function (array){
            var arrayOrdenado = [];
            this.totalPrice = 0;
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
                this.totalPrice += parseInt(array[i].price) * 1.21;
                }
                console.info("totalprice", this.totalPrice);
                return this.totalPrice;
            }
        };

        this.getCartItems = function(){
            var storedValues = $cookies.getObject('carrito');
            if ( storedValues != undefined && storedValues != null) {
                this.cartElements = $scope.storedValues;
                this.totalPrice = buildOrder($scope.storedValues);
            }
            return this.cart;
        };


    });