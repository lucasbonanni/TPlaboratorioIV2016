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
      }, ]
    };

    var uploader = $scope.uploader = new FileUploader({
      url: 'http://localhost/personaSlim/ws1/images'
    });


    /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*/

    // FILTERS

    uploader.filters.push({
      name: 'imageFilter',
      fn: function (item /*{File|FileLikeObject}*/ , options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });


    $scope.change = function (value) {
      console.info("element", value);
    }

    // CALLBACKS

    /*        uploader.onWhenAddingFileFailed = function(item {File|FileLikeObject}, filter, options) {
                console.info('onWhenAddingFileFailed', item, filter, options);
    		};
            uploader.onAfterAddingFile = function(fileItem) {
                console.info('onAfterAddingFile', fileItem);
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
            };
            uploader.onCompleteItem = function(fileItem, response, status, headers) {
                console.info('onCompleteItem', fileItem, response, status, headers);
            };
            uploader.onCompleteAll = function() {
                console.info('onCompleteAll');
            };*/


  });
