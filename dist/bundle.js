angular.module('app',['ui.router','ngCookies'])
    .config(['$httpProvider',function($httpProvider){

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        var param = function(obj) {
          var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
            
          for(name in obj) {
            value = obj[name];
              
            if(value instanceof Array) {
              for(i=0; i<value.length; ++i) {
                subValue = value[i];
                fullSubName = name + '[' + i + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
              }
            }
            else if(value instanceof Object) {
              for(subName in value) {
                subValue = value[subName];
                fullSubName = name + '[' + subName + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
              }
            }
            else if(value !== undefined && value !== null)
              query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
          }
            
          return query.length ? query.substr(0, query.length - 1) : query;
        };
       
        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
          return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
      }]);

//var host = 'http://125.216.250.105/bbter/index.php/Home/' ;
var host = 'http://192.168.1.120/bbter/index.php/Home/' ;

var boyslove = "isayserious";

var school = [  {"name": "请选择","value": ""},
                {"name": "C.材料科学与工程学院","value": "材料科学与工程学院"},
        		{"name": "D.电子与信息学院","value": "电子与信息学院"},
        		{"name": "D.电力学院","value": "电力学院"},
        		{"name": "F.法学院(知识产权学院)","value": "法学院(知识产权学院)"},
        		{"name": "G.国际教育学院","value": "国际教育学院"},
        		{"name": "G.工商管理学院(创业教育学院)","value": "工商管理学院(创业教育学院)"},
        		{"name": "G.公共管理学院","value": "公共管理学院"},
        		{"name": "H.环境与能源学院","value": "环境与能源学院"},
        		{"name": "H.化学与化工学院","value": "化学与化工学院"},
        		{"name": "J.机械与汽车工程学院","value": "机械与汽车工程学院"},
        		{"name": "J.计算机科学与工程学院","value": "计算机科学与工程学院"},
       		    {"name": "J.建筑学院","value": "建筑学院"},
    			{"name": "J.经济与贸易学院","value": "经济与贸易学院"},
        		{"name": "L.理学院(数学系 物理系)","value": "理学院(数学系 物理系)"},
        		{"name": "Q.轻工与食品学院","value": "轻工与食品学院"},
        		{"name": "R.软件学院","value": "软件学院"},
        		{"name": "S.生物科学与工程学院","value": "生物科学与工程学院"},
        		{"name": "S.思想政治学院","value": "思想政治学院"},
        		{"name": "S.设计学院","value": "设计学院"},
        		{"name": "T.土木与交通学院","value": "土木与交通学院"},
        		{"name": "T.体育学院","value": "体育学院"},
        		{"name": "W.外国语学院","value": "外国语学院"},
        		{"name": "X.新闻与传播学院","value": "新闻与传播学院"},
        		{"name": "Y.艺术学院","value": "艺术学院"},
        		{"name": "Y.医学院","value": "医学院"},
        		{"name": "Z.自动化科学与工程学院","value": "自动化科学与工程学院"},
  			];

var gender = [  {"name": "请选择","value": ""},
                {"name": "男","value": "男"},
                {"name": "女","value": "女"}
                 ];

var dprt = [    {"name": "所有部门","value": ""},
                {"name": "B.编辑部","value": "编辑部"},
                {"name": "C.策划推广部","value": "策划推广部"},
                {"name": "J.技术部","value": "技术部"},
                {"name": "J.节目部","value": "节目部"},
                {"name": "R.人力资源部","value": "人力资源部"},
                {"name": "S.视觉设计部","value": "视觉设计部"},
                {"name": "S.视频部","value": "视频部"}, 
                {"name": "W.外联部","value": "外联部"},
                {"name": "Z.综合管理部","value": "综合管理部"},
                {"name": "Z.综合新闻部","value": "综合新闻部"}
            ];

var position = [    {"name": "所有职位","value": ""},
                    {"name": "干事","value": "干事"},
                    {"name": "主管","value": "主管"},
                    {"name": "部长","value": "部长"},
                    {"name": "常委","value": "常委"}
                ];
angular.module('app')
	.config(function($stateProvider,$urlRouterProvider){

		$urlRouterProvider.when('','/login')
						  .when('/user','/user/info')
						  .when('/list','/list/all/&&/1')
						  .when('/dprt','/dprt/all')

		$stateProvider
			.state('user',{
				abstract: true,
				url: '/user',
				templateUrl: 'templates/navi/navi-user.html'
			})
			.state('list',{
				url: '/list',
				abstract: true,
				templateUrl: 'templates/navi/navi-list.html'
			})
			.state('dprt',{
				url: '/dprt',
				abstract: true,
				templateUrl: 'templates/navi/navi-dprt.html'
			})
			.state('login',{
				url: '/login',
				templateUrl: 'templates/login.html',
				controller: function($scope,$cookies,userService){					

					$scope.update = function(){

						var user = {};

						user.studentNo = $scope.studentNo;
						user.password = $scope.password;

						userService.login(user)
							.then(function(response){	

								userService.cookieset(response.data.token);

								if(userService.result(response.data.code)){

									location.href = '#/user';

								}

							});


					};
				}
			});

		


	});
angular.module('app')
	.config(function($stateProvider){

		$stateProvider

			.state('dprt.all',{
				url: '/all',
				templateUrl: 'templates/department/department-all.html',
				controller: function($scope,userService,dprtall){

					dprtall.show()
						.then(function(response){

							userService.cookieset(response.data.token);
							
							if(userService.result(response.data.code)){

								$scope.dprts = response.data.data.dprt;

							};

					$scope.radio = {};

					$scope.edit = function(){

						if($scope.radio.dprt != undefined){

							location.href = '#/dprt/edit/' + $scope.radio.dprt ;

						} else {

							alert("请选择对象");

						}


					};

					$scope.del = function(){

						var editmsg = {};

						editmsg.id = $scope.radio.dprt;

						if(editmsg.id != undefined){

							dprtall.del(editmsg)
								.then(function(response){

								userService.cookieset(response.data.token);

								if(userService.result(response.data.code)){

									alert("success");
									
								};
							});

						} else {

							alert("请选择对象");

						}
		

					};


					});

				}
			});


	});
angular.module('app')
	.config(function($stateProvider){

		$stateProvider

			.state('dprt.add',{
				url: '/add',
				templateUrl: 'templates/department/department-add.html',
				controller: function($scope,userService,dprtall){

					$scope.add = function(){

						var editmsg = {};

						editmsg.dprtname = $scope.dprtname;
						editmsg.dprtnote = $scope.dprtnote;

						dprtall.edit(editmsg)
							.then(function(response){

								userService.cookieset(response.data.token);
								
								if(userService.result(response.data.code)){

									alert("success");
									location.href = '#/dprt/all';

								};

					});

				};

				}
			});


	});
angular.module('app')
	.config(function($stateProvider){

		$stateProvider

			.state('dprt.edit',{
				url: '/edit/:id',
				templateUrl: 'templates/department/department-edit.html',
				controller: function($scope,$stateParams,userService,dprtall){

					var request = {};

					request.id = $stateParams.id;

					dprtall.editshow(request)
						.then(function(response){

							userService.cookieset(response.data.token);
							
							if(userService.result(response.data.code)){

								$scope.content = response.data.data;

								$scope.dprtname = $scope.content.dprtname;
								$scope.dprtnote = $scope.content.dprtnote;

							};
						});

					$scope.edit = function(){

						var editmsg = {};

						editmsg.id = request.id;
						editmsg.dprtname = $scope.dprtname;
						editmsg.dprtnote = $scope.dprtnote;

						dprtall.edit(editmsg)
							.then(function(response){

								userService.cookieset(response.data.token);
								
								if(userService.result(response.data.code)){

									alert("success");
									location.href = '#/dprt/all';

								};

					});

				};
			}


	});
});
angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('user.pw',{
				url: '/pwedit',
				templateUrl: 'templates/user/password-edit.html',
				controller: function($scope,userinfo,userService){

					$scope.pwedit = function(){

						if($scope.newpw == $scope.cfrmpw){

							var editmsg = {};

								editmsg.old = $scope.oldpw;
								editmsg.new = $scope.newpw;
								editmsg.cfrm = $scope.cfrmpw;

								userinfo.password(editmsg)
									.then(function(response){

									userService.cookieset(response.data.token);
									
									if(userService.result(response.data.code)){
										
											alert("success,请重新登录");

											userService.logout();
											location.href = '#/login';

										}
									});}
						else{

							alert("确认密码不一致");

						}

					};

				}
			});


	});
angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			
			.state('user.edit',{
				url: '/infoedit',
				templateUrl: 'templates/user/info-edit.html',
				controller: function($scope,userinfo,userService){

					userinfo.show()
						.then(function(response){	

							userService.cookieset(response.data.token);
							
							if(userService.result(response.data.code)){

								$scope.content = response.data.data;
						 
								$scope.username = $scope.content.username;
								$scope.room = $scope.content.room;
								$scope.telLong = $scope.content.telLong;
								$scope.telShort = $scope.content.telShort;
								$scope.email = $scope.content.email;
								$scope.genderopt = gender;
  								$scope.gender = $scope.content.gender;
  								$scope.schoolopt = school;
  								$scope.school = $scope.content.school;

							}
						});

					$scope.infoedit = function(){

						var editmsg = {};

						editmsg.username = $scope.username;
						editmsg.gender = $scope.gender;
						editmsg.school = $scope.school;
						editmsg.room = $scope.room;
						editmsg.telLong = $scope.telLong;
						editmsg.telShort = $scope.telShort;
						editmsg.email = $scope.email;

						userinfo.edit(editmsg)
							.then(function(response){

							userService.cookieset(response.data.token);
							
							if(userService.result(response.data.code)){

									alert("success");
									location.href = '#/user/info';

								};
							});
						
					};

					

				}
			});


	});
angular.module('app')
	.config(function($stateProvider){

		$stateProvider

			.state('user.info',{
				url: '/info',
				templateUrl: 'templates/user/info-detail.html',
				controller:  function($scope,userinfo,userService){

					userinfo.show()
						.then(function(response){

							userService.cookieset(response.data.token);

							if(userService.result(response.data.code)){

								$scope.content = response.data.data;

							}
						});

				}
			});
			


	});
angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.all',{
				url: '/all/:dprt&:position&:keyword/:current',
				templateUrl: 'templates/list/list-all.html',
				controller: function($scope,$stateParams,listall,userService){

					var x = parseInt($stateParams.current);

					$scope.dprtopt = dprt;
					$scope.positionopt = position;

					$scope.dprt = $stateParams.dprt;
					$scope.position = $stateParams.position;
					$scope.keyword = $stateParams.keyword;
					$scope.current = $stateParams.current;

					var editmsg = {};
					editmsg.filter = {};

					editmsg.current = x;
					editmsg.count = 15;
					editmsg.filter.dprt = $stateParams.dprt;
					editmsg.filter.position = $stateParams.position;
					editmsg.filter.keyword = $stateParams.keyword;

					listall.show(editmsg)
						.then(function(response){
							
							userService.cookieset(response.data.token);
							
							if(userService.result(response.data.code)){

								$scope.members = response.data.data.members;
								$scope.total = response.data.data.total;

							};

						});


					$scope.filter = function(){

						location.href = '#list/all/' + $scope.dprt + '&' + $scope.position + '&' + $scope.keyword + '/1'

					};

					$scope.pagenext = function(){

						if((x + 1)<=$scope.total){
							location.href = '#list/all/' + $scope.dprt + '&' + $scope.position + '&' + $scope.keyword + '/' + ( x + 1 )
						}
						else{
							alert("last")
						}
						
					};

					$scope.pageprev = function(){

						if((x - 1)>=1){
							location.href = '#list/all/' + $scope.dprt + '&' + $scope.position + '&' + $scope.keyword + '/' + ( x - 1 )
						}
						else{
							alert("first")
						}
						
					};
					
				}
			});
}); 
angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.detail',{
				url: '/detail/:id',
				templateUrl: 'templates/list/list-detail.html',
				controller: function($scope,$stateParams,listall,userService){

					listall.detail($stateParams)
						.then(function(response){

							userService.cookieset(response.data.token);

							if(userService.result(response.data.code)){

								$scope.content = response.data.data;
								
							};
						});

				}
			});

});
angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.dprt',{
				url: '/dprt',
				templateUrl: 'templates/list/list-department.html',
				controller: function($scope,listdprt,userService){

					listdprt.show()
						.then(function(response){

							userService.cookieset(response.data.token);
							
							if(userService.result(response.data.code)){

								$scope.members = response.data.data.members;
								
							};

						});
					
					$scope.checkbox = [];
					$scope.rcl = "退休";
					$scope.position = "主管";

					function checkboxselect(){

						var id = '';

						for(x = 0;x < $scope.checkbox.length;x++){
					
							if($scope.checkbox[x] != null){
					
								id = id + $scope.checkbox[x].column + ',';
							};
					
						};
									
						id = id.substring(0,id.length-1);

						return id;

					}

					$scope.recycle = function(){
					
						var editmsg = {};

						editmsg.id = checkboxselect();

						if(editmsg.id != ''){

							editmsg.note = $scope.rcl;

							listdprt.rcl(editmsg)
								.then(function(response){

								userService.cookieset(response.data.token);

								if(userService.result(response.data.code)){

									alert("success");
									
								};
							});
						} else {

							alert("请选择对象");

						}

					};

					$scope.changeposition = function(){
					
						var editmsg = {};

						editmsg.id = checkboxselect();

						if(editmsg.id != ''){

							editmsg.position = $scope.position;

							listdprt.position(editmsg)
								.then(function(response){

								userService.cookieset(response.data.token);

								if(userService.result(response.data.code)){

									alert("success")
									
								}
							});
						} else {

							alert("请选择对象");

						}

					};

					$scope.reset = function(){
					
						var id = checkboxselect();

						if(id != ''){

							location.href = '#/list/reset/' + id ;

						} else {

							alert("请选择对象");

						}

					};

				}
			});

});
angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.add',{
				url: '/add',
				templateUrl: 'templates/list/list-add.html',
				controller: function($scope,listdprt,userService){

					$scope.position = "干事";

					$scope.add = function(){

						var editmsg = {};

						editmsg.studentno = $scope.studentno;
						editmsg.position = $scope.position;

						listdprt.add(editmsg)
							.then(function(response){

							userService.cookieset(response.data.token);

							if(userService.result(response.data.code)){

								alert("success");
								location.href = '#/list/dprt';
								
							}
						});
					}

				}
			});

});
angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.reset',{
				url: '/reset/:id',
				templateUrl: 'templates/list/list-resetpw.html',
				controller: function($scope,$stateParams,listdprt,userService){

					var idrequest = {};
					idrequest.id = $stateParams.id

					listdprt.resetshow(idrequest)
						.then(function(response){

							userService.cookieset(response.data.token);
							
							if(userService.result(response.data.code)){

								$scope.members = response.data.data.members;
								
							};

						});
					
					$scope.reset = function(){

						var editmsg = {};

						editmsg.id = idrequest.id;
						editmsg.pw = $scope.pw;
						editmsg.pwcfrm = $scope.pwcfrm;

						listdprt.reset(editmsg)
							.then(function(response){

								userService.cookieset(response.data.token);
								
								if(userService.result(response.data.code)){

									alert("success");

									location.href = '#/list/dprt';
									
								};

							});

					};					

				}
			});

});
angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.recycle',{
				url: '/recycle/:current',
				templateUrl: 'templates/list/list-recycle.html',
				controller: function($scope,$stateParams,listrcl,userService){

					var x = parseInt($stateParams.current);

					$scope.current = $stateParams.current;

					var editmsg = {};

					editmsg.current = x;
					editmsg.count = 15;


					listrcl.show(editmsg)
						.then(function(response){
							
							userService.cookieset(response.data.token);
							
							if(userService.result(response.data.code)){

								$scope.members = response.data.data.members;
								$scope.total = response.data.data.total;

							};

						});

					$scope.pagenext = function(){

						if((x + 1)<=$scope.total){
							location.href = '#list/recycle/' + ( x + 1 ) ;
						}
						else{
							alert("last")
						}
						
					};

					$scope.pageprev = function(){

						if((x - 1)>=1){
							location.href = '#list/recycle/' + ( x - 1 ) ;
						}
						else{
							alert("first")
						}
						
					};

					$scope.checkbox = [];

					function checkboxselect(){

						var id = '';

						for(x = 0;x < $scope.checkbox.length;x++){
					
							if($scope.checkbox[x] != null){
					
								id = id + $scope.checkbox[x].column + ',';
							};
					
						};
									
						id = id.substring(0,id.length-1);

						return id;

					}

					$scope.recover = function(){

						var editmsg = {};

						editmsg.id = checkboxselect();

						if(editmsg.id != ''){

							editmsg.position = $scope.position;

							listrcl.recover(editmsg)
								.then(function(response){

								userService.cookieset(response.data.token);

								if(userService.result(response.data.code)){

									alert("success")
									
								}
							});

						} else {

							alert("请选择对象");

						}

					};

					$scope.del = function(){


						var editmsg = {};

						editmsg.id = checkboxselect();

						if(editmsg.id != ''){

							editmsg.position = $scope.position;

							listrcl.del(editmsg)
								.then(function(response){

								userService.cookieset(response.data.token);

								if(userService.result(response.data.code)){

									alert("success")
									
								}
							});

						} else {

							alert("请选择对象");

						}
							

					};

				}
			});

});
angular.module('app')
	
	.service('userService',function($http,$cookies) {

		return{

			login: function(editmsg){

				var user = {};

				user.studentno = editmsg.studentNo;
				user.password = md5(editmsg.password);

				return $http.post(host + 'Login',user);

				},

			logout: function(user){

				var timestamp = new Date().getTime();
				var token = $cookies.get("token");
				var auth = token + '.' + timestamp + '.' + GibberishAES.enc(token + ':' + timestamp, boyslove);

				$http.post(host + 'User/logout',auth);

				$cookies.remove("token");
				
			},

			auth: function(){

				var timestamp = new Date().getTime();
				var token = $cookies.get("token");
				var auth = token + '.' + timestamp + '.' + GibberishAES.enc(token + ':' + timestamp, boyslove);
				
				return auth;

			},

			cookieset: function(editmsg){

				var date = new Date();
				date.setDate(date.getDate() + 7);
				var expire = date;

				$cookies.put("token",editmsg,{ 'expires': expire});

				return true;

			},

			result: function(editmsg){

				switch(editmsg){
					case 101:
						alert("存在未输入项");
						return false;
						break;

					case 103:
						alert("账号密码错误");
						location.href = '#/login';
						return false;
						break;

					case 105:
						alert("新旧密码相同");
						return false;
						break;

					case 106:
						alert("确认密码不一致");
						return false;
						break;

					case 107:
						alert("旧密码错误");
						return false;
						break;

					case 200:
						return true;
						break;

					case 201:
						location.href = '#/user/infoedit';
						return false;
						break;

					case 300:
						alert("你不具有该权限");
						history.back();
						return false;
						break;

					case 302:
						alert("账号异常，请重新登录");
						location.href = '#/login';
						return false;
						break;

					case 500:
						alert("未知错误");
						return false;
						break;
				};

				

			}

			};
		});
angular.module('app')
	
	.service('dprtall',function($http,userService) {

		return{

			show: function(){

				var postdata = {};

				postdata.auth = userService.auth();

				return $http.post('test/get/dprtAll.json',postdata);

				},

			editshow: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/dprtedit.json',postdata);

				},

			edit: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/result.json',postdata);

				},

			add: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/result.json',postdata)

				},

			del: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/result.json',postdata);

				}

			};
		}
	);
angular.module('app')
	
	.service('listall',function($http,userService) {

		return{

			show: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post(host + 'User/listall',postdata);

				},

			detail: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/listAllDetail.json',postdata);

				}

			

			};
		});
angular.module('app')
	
	.service('listdprt',function($http,userService) {

		return{

			show: function(){

				var postdata = {};

				postdata.auth = userService.auth();

				return $http.post('test/get/listDprt.json',postdata);

				},

			resetshow: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/listDprtReset.json',postdata);

				},

			add: function(editmsg){

				var postdata = {};
				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/result.json',postdata);

				},

			rcl: function(editmsg){

				var postdata = {};
				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/result.json',postdata);

				},

			position: function(editmsg){

				var postdata = {};
				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/result.json',postdata);

				},

			reset: function(editmsg){

				var postdata = {};
				postdata.data = {};

				postdata.auth = userService.auth();
				postdata.data.id = editmsg.id;
				postdata.data.pw = md5(editmsg.pw);
				postdata.data.pwcfrm = md5(editmsg.pwcfrm);

				return $http.post('test/get/result.json',postdata);

				}

			};
		});
angular.module('app')
	
	.service('listrcl',function($http,userService) {

		return{

			show: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/listRcl.json',postdata);

				},

			del: function(editmsg){

				var postdata = {};
				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/result.json',postdata);		
			},

			recover: function(editmsg){

				var postdata = {};
				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/result.json',postdata);
			}

			};
		}
	);
angular.module('app')
	
	.service('userinfo',function($http,userService) {

		return{

			show: function(){

				var postdata = {};

				postdata.auth = userService.auth();
				
				return $http.post(host + 'User/info',postdata);


				},

			edit: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post(host + 'User/infoEdit',postdata);
		
			},

			password: function(editmsg){

				var postdata = {};
				postdata.data = {};

				postdata.auth = userService.auth();
				postdata.data.old = md5(editmsg.old);
				postdata.data.new = md5(editmsg.new);
				postdata.data.cfrm = md5(editmsg.cfrm);

				return $http.post(host + 'User/pwEdit',postdata);

			}

			};
		}
	);
angular.module('app')
	.directive('logoutBtn',function(userService){
		return{
			restrict: "A",
			link: function(scope,element,attrs){
				element.bind("click",function(){
					
                	userService.logout();

					location.href = '#/login';

				})
			}
		}
		 
	})
//# sourceMappingURL=bundle.js.map
