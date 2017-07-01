'use strict';
angular


    .module('tplaboratorioIv2016App')
    .directive('googleMapsJs',[function () {
        function link(scope, element, attrs) {
            scope.markers = [];

            function createMap(lat, lng) {
                var mapOptions = {
                    zoom: 16,
                    center: new google.maps.LatLng(lat, lng),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

                var marker = new google.maps.Marker({
                    map: scope.map,
                    position: new google.maps.LatLng(lat, lng),
                    title: 'tu lugar'
                });
                scope.markers.push(marker);

            }

            navigator.geolocation.getCurrentPosition(function (position) {
                scope.lat = position.coords.latitude;
                scope.lng = position.coords.longitude;
                createMap(position.coords.latitude, position.coords.longitude);
            });


        }
        return {
            restrict: 'A',
            template: '<div id="map" style="width: 400px;height: 250px;"></div>',
            replace: true,
            scope: {
                makers: '=',
                map: '='
            },
            link: link
        };
    }]);
