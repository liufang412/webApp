// angularJs中service的三种方法
// angular.module('app').service('cache',['$cookies',function($cookies){
	// service直接返回函数或对象，直接在this上扩展
// 	this.put=function(key,value){
// 		$cookies.put(key,value);
// 	}
// 	this.get=function(key){
// 		return $cookies.get(key);
// 	}
// 	this.remove=function(key){
// 		$cookies.remove(key);
// 	}
// }])
angular.module('app').factory('cache',['$cookies',function($cookies){
	// factory返回的是对象，可以定义私有属性或对象
	// var obj={}
	return {
		put:function(key,value){
			$cookies.put(key,value);
		},
		get:function(key,value){
			$cookies.get(key,value);
		},
		remove:function(key,value){
			$cookies.remove(key,value);
		}
	}
}])