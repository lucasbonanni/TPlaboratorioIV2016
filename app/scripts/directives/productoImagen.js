angular
.module('tplaboratorioIv2016App')
.directive('productoImagen',function(){
	
	return { 
		scope:{
			product: '=producto'
		},
		restrict:"E" , 
		templateUrl:'templates/producto.html'};
});