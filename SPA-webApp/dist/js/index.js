angular.module("app",["ui.router","ngCookies","validation"]),angular.module("app",["ui.router","ngCookies","validation"]).config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("main",{url:"/main",templateUrl:"view/main.html",controller:"mainCtrl"}).state("position",{url:"/position/:id",templateUrl:"view/position.html",controller:"positionCtrl"}).state("company",{url:"/company/:id",templateUrl:"view/company.html",controller:"positionClassCtr"}).state("search",{url:"/search",templateUrl:"view/search.html",controller:"searchCtr"}).state("login",{url:"/login",templateUrl:"view/login.html",controller:"loginCtr"}).state("register",{url:"/register",templateUrl:"view/register.html",controller:"registerCtr"}).state("my",{url:"/my",templateUrl:"view/my.html",controller:"myCtr"}),e.otherwise("main")}]),angular.module("app").config(["$validationProvider",function(t){t.setExpression({phone:/^1[\d]{10}$/,password:function(t){return(t+"").length>5},nomalCode:function(t){return 4==(t+"").length},telCode:function(t){return 4==(t+"").length}}).setDefaultMsg({phone:{success:"",error:"必须是11位手机号"},password:{success:"",error:"长度至少6位"},nomalCode:{success:"",error:"长度是4位"},telCode:{success:"",error:"长度是4位"}})}]),angular.module("app").controller("loginCtr",["$scope",function(t){t.loginMode=!0,t.submit=function(){console.log(t.user)}}]),angular.module("app").controller("mainCtrl",["$http","$scope",function(t,e){t.get("../data/positionList.json").then(function(t){e.list=t.data})}]),angular.module("app").controller("myCtr",["$scope",function(t){}]),angular.module("app").controller("positionClassCtr",["$http","$scope","$state",function(t,e,o){t.get("/data/company.json?id="+o.params.id).then(function(t){e.position=t.data,e.$broadcast("abc",{id:1})}),e.$on("cba",function(t,e){console.log(t),console.log(e)})}]),angular.module("app").controller("positionCtrl",["$q","$http","$scope","$state","cache",function(t,e,o,i,n){e.get("/data/position.json?id="+i.params.id).then(function(t){o.position=t.data}),n.put("to","11")}]),angular.module("app").controller("registerCtr",["$http","$scope","$interval",function(t,e,o){t.get("data/pnoneCountry.json").then(function(i){e.data=i.data.list,e.code=i.data.list[0].countryList[0].code,e.isCountryList=!1,e.showcode=function(){e.code=this.value.code,e.isCountryList=!1},e.send=function(){var i=6;t.get("data/code.json").then(function(t){if(1==t.data.state){e.time="60s后重新发送";var n=o(function(){if(i<=0)return o.cancel(n),void(e.time="");i--,e.time=i+"s后重新发送"},1e3)}})}})}]),angular.module("app").controller("searchCtr",["$scope","$http",function(t,e){t.cities=[{cityList:["北京","上海","广州","深圳","成都","杭州"],name:"热门城市",nameStr:"热门城市"},{cityList:["澳门特别行政区","保定","北海","北京","包头","长春","成都","常德","重庆","长沙","常州","沧州","郴州","滁州","潮州","东莞","大连","大理","东营","德阳","德州","佛山","阜阳","福州"],name:"",nameStr:"ABCDEF"},{cityList:["桂林","贵阳","广州","赣州","淮安","邯郸","哈尔滨","合肥","呼和浩特","海口","衡水","衡阳","杭州","惠州","湖州","菏泽","金华","吉林","江门","济南","济宁","嘉兴","揭阳","焦作"],name:"",nameStr:"GHIJ"},{cityList:["昆明","廊坊","拉萨","丽水","临沂","洛阳","连云港","兰州","柳州","马鞍山","绵阳","宁波","南昌","南充","南京","南宁","南通","南阳"],name:"",nameStr:"KLMN"},{cityList:["莆田","濮阳","青岛","黔东南","秦皇岛","清远","泉州","日照"],name:"",nameStr:"OPQR"},{cityList:["韶关","上海","石家庄","宿迁","汕头","绍兴","沈阳","三亚","邵阳","深圳","苏州","宿州","泰安","天津","唐山","太原","台州","泰州"],name:"",nameStr:"STUV"},{cityList:["潍坊","武汉","芜湖","威海","乌鲁木齐","无锡","温州","西安","香港特别行政区","厦门","西宁","湘潭","邢台","新乡","咸阳","信阳","徐州","银川","盐城","宜昌","烟台","扬州","淄博","珠海","镇江","湛江","周口","肇庆","中山","遵义","郑州","漳州","株洲"],name:"",nameStr:"WXYZ"}],e.get("data/positionList.json").then(function(e){t.positionList=e.data})}]),angular.module("app").directive("companyDesc",[function(){return{restrict:"A",templateUrl:"view/template/companyDesc.html",replace:!0,scope:{position:"="}}}]),angular.module("app").directive("appFoot",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/foot.html"}}]),angular.module("app").directive("appHead",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/head.html"}}]),angular.module("app").directive("positionClass",[function(){return{restrict:"A",templateUrl:"view/template/positionClass.html",replace:!0,scope:{position:"="},link:function(t){t.isSelected=0,t.listShow=function(e){t.positionList=t.position.positionClass[e],t.isSelected=e},t.$on("abc",function(t,e){console.log(t,e)}),t.$emit("cba",{id:2})}}}]),angular.module("app").directive("positionDescribe",[function(){return{templateUrl:"view/template/positionDescribe.html",restrict:"A",replace:!0,scope:{pos:"="}}}]),angular.module("app").directive("positionFoot",[function(){return{templateUrl:"view/template/positionFoot.html",restrict:"A",replace:!0}}]),angular.module("app").directive("positionHead",[function(){return{templateUrl:"view/template/positionHead.html",restrict:"A",replace:!0,scope:{text:"@"},link:function(t){t.callback=function(){window.history.back()}}}}]),angular.module("app").directive("appPositionList",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/positionList.html",scope:{data:"="}}}]),angular.module("app").directive("search",[function(){return{restrict:"A",templateUrl:"view/template/searchMain.html",replace:!0,scope:{cities:"=",data:"="},link:function(t){t.cityName="全国",t.city=function(){t.citiesShow=!1,t.cityName=this.value,console.log(this)},t.search=function(){if(t.serachCon=t.searchInput,t.result=[],"全国"==t.cityName)for(var e=0;e<t.data.length;e++)t.serachCon!=t.data[e].city&&t.serachCon!=t.data[e].position&&t.serachCon!=t.data[e].name||t.result.push(t.data[e]);else for(e=0;e<t.data.length;e++)t.serachCon==t.data[e].position&&t.cityName==t.data[e].city&&t.result.push(t.data[e]),t.serachCon==t.data[e].name&&t.cityName==t.data[e].city&&t.result.push(t.data[e])}}}}]),angular.module("app").factory("cache",["$cookies",function(t){return{put:function(e,o){t.put(e,o)},get:function(e,o){t.get(e,o)},remove:function(e,o){t.remove(e,o)}}}]);