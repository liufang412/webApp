angular.module('app').controller('registerCtr',["$http","$scope","$interval",function($http,$scope,$interval){
	$http.get('data/pnoneCountry.json').then(function(res){
		$scope.data=res.data.list;
		$scope.code=res.data.list[0].countryList[0].code;
		$scope.isCountryList=false;
		$scope.showcode=function(){
			$scope.code=this.value.code;
			$scope.isCountryList=false;
		}
		// $scope.submit=function(){
		// 	$http.post('data/register.json',$scope.user).then(function(res){
		// 		console.log(res);
		// 	})
		// }
		
		$scope.send=function(){
			var count=6;
			$http.get('data/code.json').then(function(res){
				if (1==res.data.state){
					$scope.time='60s后重新发送';
					var interval=$interval(function(){
						if (count<=0) {
							$interval.cancel(interval);
							$scope.time='';
							return;
						}
						count--;
						$scope.time=count+'s后重新发送';
					},1000)
				}
			})
		}
	})
}])