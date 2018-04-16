angular.module('app').directive('positionDescribe',[function(){
	return {
		templateUrl:'view/template/positionDescribe.html',
		restrict:'A',
		replace:true,
		scope:{
			pos:"="
		}
	}
}])