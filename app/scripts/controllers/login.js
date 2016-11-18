'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tplaboratorioIv2016App
 */
angular.module('tplaboratorioIv2016App')
  .controller('LoginCtrl', function ($scope, $auth) {
    console.info('loginController',$auth);

    console.info("autenticated", $auth.getPayload());
    $scope.passwd = '321';
    $scope.email = 'admin@admin.com';

    if($auth.isAuthenticated()){
		console.info("autenticated", $auth.getPayload());
	} else
	{
		console.info("is not autenticated", $auth.getPayload());
	}

    /*$scope.usuario.mail = 'lucas';
    $scope.usuario.passwd = 'asdfasdf';*/

    $scope.loguear = function(){

    	var user = {
		  correo: $scope.email,
		  clave: $scope.passwd
		};

	$auth.login(user)
	  .then(function(response) {
	    // Redirect user here after a successful log in.
	    console.info("correcto",response);

    	if($auth.isAuthenticated())
    	{
			console.info("autenticated", $auth.getPayload());
		}else
		{
			console.info("is not autenticated", $auth.getPayload());
		}

	  })
	  .catch(function(response) {
	    // Handle errors here, such as displaying a notification
	    // for invalid email and/or password.
	    console.info("error",response);


	  });
	};


  });
