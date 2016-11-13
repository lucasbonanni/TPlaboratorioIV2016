angular
.module('tplaboratorioIv2016App')
.directive('productoImagen',function(){
	
	return { replace:true, restrict:"E" , templateUrl:'templates/producto.html'};
});