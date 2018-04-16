angular.module('app')
	.controller('positionClassCtr',['$http','$scope','$state',function($http,$scope,$state){
	$http.get('/data/company.json?id='+$state.params.id).then(function(resp){
		// console.log(resp.data);
		// console.log($state.params.id);
		$scope.position=resp.data;
		// console.log($scope.position);
		// 事件的广播  上级向下级广播  参数（事件的名称，传递的参数）
		// 发出数据的时候要考虑接收方是否初始化完成
		$scope.$broadcast('abc',{id:1});
	});
	// 接收广播，参数（接收的事件名字，函数），函数的参数（事件，事件传过来的数据）
	$scope.$on('cba',function(event,data){
		console.log(event);
		console.log(data);
	})

		
	
}]);