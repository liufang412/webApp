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