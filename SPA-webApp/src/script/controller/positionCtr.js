angular.module('app').controller('positionCtrl',['$q','$http','$scope','$state','cache',function($q,$http,$scope,$state,cache){
	$http.get('/data/position.json?id='+$state.params.id).then(function(resp){
		// console.log(resp);
		// console.log($state.params.id);
		$scope.position=resp.data;
	});
	// cache.put('to','day')
	// cache.remove('to')
	cache.put('to','11')
	// cache.remove('to')

		
	
}]);