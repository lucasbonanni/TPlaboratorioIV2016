'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tplaboratorioIv2016App
 */
angular.module('tplaboratorioIv2016App')
  .controller('LoginCtrl', function ($scope, servicioLogin, permisosFactory,$state,$auth) {
  	$scope.passwd = '';
  	$scope.email = '';

    $scope.adminLogin = function() {
    	    $scope.passwd = 'miclave';
    		$scope.email = 'lucas@test.com';
    };

     $scope.userLogin = function() {
    	    $scope.passwd = 'miclave';
    		$scope.email = 'lucas@12315test.com';
    };


    $scope.loguear = function(){
    	var user = {};
    	user.mail = $scope.email;
    	user.clave = $scope.passwd;
		$auth.login(user)
		//servicioLogin.doLogin($scope.email, $scope.passwd)
			.then(function(response) {
			    // Redirect user here after a successful log in.
			    console.info("correcto",response);

		    	if(permisosFactory.isAuthenticated())
		    	{
					//console.log("autenticated",permisosFactory.isAuthenticated());
					//$location.path('/');
					$state.go('main');
				}
				else
				{
					console.log("is not autenticated",response);	
					//$state.go('main');
				}

		  	},function (error) {
				console.info("error",error);
		});
	};


  });
