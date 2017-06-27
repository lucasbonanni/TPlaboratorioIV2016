'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:productsCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */

angular.module('tplaboratorioIv2016App')
    .controller('productsCtrl', function ($scope, FileUploader) {

        var imagesToUpload = [];
        $scope.showAlert = false;


        $scope.noWrapSlides = false;
        $scope.active = 0;
        var slides = $scope.slides = [];
        var currIndex = 0;

        $scope.createOrUpdate = function(){
            if(imagesToUpload.length > 0 ) {
                $scope.showAlert = true;
            } else {

            }
                
        }

        $scope.myData = [{
            "nombre": "Cox",
            "descripcion": "Carney",
            "precio": "$10",
            "tipo": "Enormo",
            "descuento": true
        }, {
            "nombre": "Lorraine",
            "descripcion": "Wise",
            "precio": "$124",
            "tipo": "Comveyer",
            "descuento": false
        }, {
            "nombre": "Nancy",
            "descripcion": "Waters",
            "precio": "$75",
            "company": "Fuelton",
            "employed": false
        }];
        $scope.data = {
            model: null,
            list: [{
                "name": "nombre1",
                "id": "1"
            }, {
                "name": "nombre2",
                "id": "2"
            }, {
                "name": "nombre3",
                "id": "3"
            } ]
        };

        var uploader = $scope.uploader = new FileUploader({
            url: 'http://localhost/personaSlim/ws1/images'
        });


        /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*/

        // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function (item /*{File|FileLikeObject}*/ , options) {
                imagesToUpload.push(item);
                console.info("array",imagesToUpload);
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });


        $scope.change = function (value) {
            console.info("element", value);
        };

        $scope.buttonClick = function(){
            var objectPr = JSON.stringify(slides);
            console.info("stringigy",objectPr);
        };

        // CALLBACKS

        /*        uploader.onWhenAddingFileFailed = function(item {File|FileLikeObject}, filter, options) {
                    console.info('onWhenAddingFileFailed', item, filter, options);
        };
                uploader.onAfterAddingFile = function(fileItem) {
                    console.info('onAfterAddingFile', fileItem);
                    $scope.showAlert = true;
                };
                uploader.onAfterAddingAll = function(addedFileItems) {
                    console.info('onAfterAddingAll', addedFileItems);
                };
                uploader.onBeforeUploadItem = function(item) {
                    console.info('onBeforeUploadItem', item);
                };
                uploader.onProgressItem = function(fileItem, progress) {
                    console.info('onProgressItem', fileItem, progress);
                };
                uploader.onProgressAll = function(progress) {
                    console.info('onProgressAll', progress);
                };
                uploader.onSuccessItem = function(fileItem, response, status, headers) {
                    console.info('onSuccessItem', fileItem, response, status, headers);
                };
                uploader.onErrorItem = function(fileItem, response, status, headers) {
                    console.info('onErrorItem', fileItem, response, status, headers);
                };
                uploader.onCancelItem = function(fileItem, response, status, headers) {
                    console.info('onCancelItem', fileItem, response, status, headers);
                };*/
                uploader.onCompleteItem = function(fileItem, response, status, headers) {
                    imagesToUpload = [];
                    $scope.slides.push({
                        image: response,
                        text: '',
                        id: currIndex++
                    });
                    console.info('onCompleteItem',  response);
                };
                uploader.onCompleteAll = function(response, status, headers) {
                    $scope.showAlert = false;
                    imagesToUpload = [];
                    console.info('onCompleteAll',response);
                    uploader.clearQueue();
                };


        /* -----------------------     carousel       -------------------------  */



        $scope.addSlide = function () {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: '//unsplash.it/' + newWidth + '/300',
                text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
                id: currIndex++
            });
        };


        for (var i = 0; i < 3; i++) {
            $scope.addSlide();
        }


    });
