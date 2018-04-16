angular.module('app',['ui.router','ngCookies','validation']);
// angular.module('app').config(['$provider',function($provider){
// 	$provider.decorator('$http',['$delegate','$q',function($delegate,$q){
// 		// 在这里delegate就相当于http
// 		var get=$delegate.get;
// 		$delegate.post(url,data,config){
// 			var def=$q.defer();
// 			 $delegate.get(url).success(function(res){
// 			 	def.resolve(res);
// 			 }).error(function(err){
// 			 	def.reject(err);
// 			 }); 
// 			return{
// 			 	success:function(cb){
// 			 		def.promise.then(cb);

// 			 	},
// 			 	error:function(){
// 			 		def.promise.then(null,cb);
// 			 	}
// 			}

// 		}
// 		return $delegate;
// 	}])
// }])
angular.module('app',['ui.router','ngCookies','validation']).config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
		$stateProvider.state('main',{
			url:'/main',
			templateUrl:'view/main.html',
			controller:'mainCtrl'
		})
		.state('position',{
			url:'/position/:id',
			templateUrl:'view/position.html',
			controller:'positionCtrl'
		})
		.state('company',{
			url:'/company/:id',
			templateUrl:'view/company.html',
			controller:'positionClassCtr'
		})
		.state('search',{
			url:'/search',
			templateUrl:'view/search.html',
			controller:'searchCtr'
		})
		.state('login',{
			url:'/login',
			templateUrl:'view/login.html',
			controller:'loginCtr'
		})
		.state('register',{
			url:'/register',
			templateUrl:'view/register.html',
			controller:'registerCtr'
		})
		.state('my',{
			url:'/my',
			templateUrl:'view/my.html',
			controller:'myCtr'
		})
		;
		$urlRouterProvider.otherwise('main');
}]);
angular.module('app').config(["$validationProvider",function($validationProvider){
	// 需要一个表达式  校验表单元素的值是否符合要求   他是一个对象
	var expression={
		// 每一个属性代表一个校验规则  可以是一个正则或函数
		phone:/^1[\d]{10}$/,
		password:function(value){
			return (value+'').length>5;

		},
		nomalCode:function(value){
			return (value+'').length==4;

		},
		telCode:function(value){
			return (value+'').length==4;

		}
	};
	// 错误提示  
	var defaultMsg={
		phone:{
			success:'',
			error:'必须是11位手机号'
		},
		password:{
			success:'',
			error:'长度至少6位'
		},
		nomalCode:{
			success:'',
			error:'长度是4位'
		},
		telCode:{
			success:'',
			error:'长度是4位'
		}

	};
	$validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}])
angular.module('app').controller('loginCtr',['$scope',function($scope){
	$scope.loginMode=true;
	$scope.submit=function(){
		console.log($scope.user);
	}
}])
angular.module('app').controller('mainCtrl',['$http','$scope',function($http,$scope){
	$http.get('../data/positionList.json').then(function(resp){
		// console.log(resp);
		// 正确请求成功时处理
		$scope.list=resp.data;
	});
	
}]);
angular.module('app').controller('myCtr',["$scope",function($scope){
	
}])
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
angular.module('app').controller('searchCtr', ['$scope',"$http",function($scope,$http) {
    $scope.cities = [{
        "cityList": ["北京", "上海", "广州", "深圳", "成都", "杭州"],
        "name": "热门城市",
        "nameStr": "热门城市"
    }, {
        "cityList": ["澳门特别行政区", "保定", "北海", "北京", "包头", "长春", "成都", "常德", "重庆", "长沙", "常州", "沧州", "郴州", "滁州", "潮州", "东莞", "大连", "大理", "东营", "德阳", "德州", "佛山", "阜阳", "福州"],
        "name": "",
        "nameStr": "ABCDEF"
    }, {
        "cityList": ["桂林", "贵阳", "广州", "赣州", "淮安", "邯郸", "哈尔滨", "合肥", "呼和浩特", "海口", "衡水", "衡阳", "杭州", "惠州", "湖州", "菏泽", "金华", "吉林", "江门", "济南", "济宁", "嘉兴", "揭阳", "焦作"],
        "name": "",
        "nameStr": "GHIJ"
    }, {
        "cityList": ["昆明", "廊坊", "拉萨", "丽水", "临沂", "洛阳", "连云港", "兰州", "柳州", "马鞍山", "绵阳", "宁波", "南昌", "南充", "南京", "南宁", "南通", "南阳"],
        "name": "",
        "nameStr": "KLMN"
    }, {
        "cityList": ["莆田", "濮阳", "青岛", "黔东南", "秦皇岛", "清远", "泉州", "日照"],
        "name": "",
        "nameStr": "OPQR"
    }, {
        "cityList": ["韶关", "上海", "石家庄", "宿迁", "汕头", "绍兴", "沈阳", "三亚", "邵阳", "深圳", "苏州", "宿州", "泰安", "天津", "唐山", "太原", "台州", "泰州"],
        "name": "",
        "nameStr": "STUV"
    }, {
        "cityList": ["潍坊", "武汉", "芜湖", "威海", "乌鲁木齐", "无锡", "温州", "西安", "香港特别行政区", "厦门", "西宁", "湘潭", "邢台", "新乡", "咸阳", "信阳", "徐州", "银川", "盐城", "宜昌", "烟台", "扬州", "淄博", "珠海", "镇江", "湛江", "周口", "肇庆", "中山", "遵义", "郑州", "漳州", "株洲"],
        "name": "",
        "nameStr": "WXYZ"
    }];
    
    $http.get('data/positionList.json').then(function(res){
    	// console.log(res.data);
    	$scope.positionList=res.data;
    })
}])

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
angular.module('app').directive('appFoot',[function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/foot.html',
		
	}
}])
angular.module('app').directive('appHead',[function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/head.html'
	}

}])
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
angular.module('app').directive('positionFoot',[function(){
	return {
		templateUrl:'view/template/positionFoot.html',
		restrict:'A',
		replace:true,
	}
}])
angular.module('app').directive('positionHead',[function(){
	return {
		templateUrl:'view/template/positionHead.html',
		restrict:'A',
		replace:true,
		scope:{
			text:'@',
		},
		link:function(scope){
			scope.callback=function(){
				window.history.back();
			}
		}
	}
}])
angular.module('app').directive('appPositionList',[function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/positionList.html',
		scope:{
			data:'='
		}
	}
}])
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