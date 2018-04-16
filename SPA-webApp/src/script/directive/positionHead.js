angular.module('app').directive('positionHead',[function(){
	return {
		templateUrl:'view/template/positionHead.html',
		restrict:'A',
		replace:true,
		scope:{
			text:'@',
		},
		link:function(scope){
			scope.callback=function(){
				window.history.back();
			}
		}
	}
}])