angular.module('app').controller('mainCtrl',['$http','$scope',function($http,$scope){
	$http.get('../data/positionList.json').then(function(resp){
		// console.log(resp);
		// 正确请求成功时处理
		$scope.list=resp.data;
	});
	
}]);