angular.module('app').directive('search',[function(){
	return {
		restrict:"A",
		templateUrl:"view/template/searchMain.html",
		replace:true,
		scope:{
			cities:'=',
			data:'=',
		},
		link:function($scope){
			$scope.cityName="全国";
			$scope.city=function(){
				$scope.citiesShow=false;
				$scope.cityName=this.value;
				console.log(this);
			}
			$scope.search=function(){
				// console.log($scope.data);
				// 职位判断,地区判断  公司判断
				$scope.serachCon=$scope.searchInput;
				$scope.result=[];
				// console.log($scope.searchInput);
				// for (var i = 0; i <$scope.data.length; i++) {
					// if ($scope.serachCon==$scope.data[i].city||$scope.serachCon==$scope.data[i].position||$scope.serachCon==$scope.data[i].name) {
					// 	$scope.result.push($scope.data[i]);
					// }
					// if ($scope.cityName=='全国') {
					// 	console.log(1);
					// }
				// }
				if ($scope.cityName=='全国') {
					for (var i = 0; i <$scope.data.length; i++) {
						if ($scope.serachCon==$scope.data[i].city||$scope.serachCon==$scope.data[i].position||$scope.serachCon==$scope.data[i].name) {
							$scope.result.push($scope.data[i]);
						}

					}
				}else{
					for (var i = 0; i <$scope.data.length; i++) {
						// 职位
						if ($scope.serachCon==$scope.data[i].position&&$scope.cityName==$scope.data[i].city) {
							$scope.result.push($scope.data[i]);
						}
						// 公司名
						if ($scope.serachCon==$scope.data[i].name&&$scope.cityName==$scope.data[i].city) {
							$scope.result.push($scope.data[i]);
						}
					}
				}

				

			}
		}
	}
}])