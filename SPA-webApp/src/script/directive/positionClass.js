angular.module('app').directive('positionClass',[function(){
	return {
		restrict:'A',
		templateUrl:'view/template/positionClass.html',
		replace:true,
		scope:{
			position:"=",
		},
		link:function($scope){
			$scope.isSelected=0;
			$scope.listShow=function(id){
				$scope.positionList=$scope.position.positionClass[id];
				$scope.isSelected=id;
			}
			// 接收广播，参数（接收的事件名字，函数），函数的参数（事件，事件传过来的数据）
			$scope.$on("abc",function(event,data){
				console.log(event,data); 
			});
			// 事件的广播  下级向上级广播  参数（事件的名称，传递的参数）
			$scope.$emit('cba',{id:2});

		}
	}
}])