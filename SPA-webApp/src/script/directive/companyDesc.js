angular.module('app').directive('companyDesc',[function(){
	return {
		restrict:'A',
		templateUrl:'view/template/companyDesc.html',
		replace:true,
		scope:{
			position:"=",
		}
	}
}])