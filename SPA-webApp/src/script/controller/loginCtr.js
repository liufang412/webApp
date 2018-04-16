angular.module('app').controller('loginCtr',['$scope',function($scope){
	$scope.loginMode=true;
	$scope.submit=function(){
		console.log($scope.user);
	}
}])