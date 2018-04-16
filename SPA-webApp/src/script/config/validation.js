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