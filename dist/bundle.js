angular.module('app',['ui.router','ngCookies']);

var currentUser = {};

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
						  .when('/dprt','/dprt/all');

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

					var user = {};

					$scope.update = function(){

						user.studentNo = $scope.studentNo;
						user.password = $scope.password;

						userService.login(user)
							.then(function(response){

								if(response.data.code==200){

									currentUser = response.data.data;
									currentUser.token = response.data.token;

									var date = new Date();
									date.setDate(date.getDate() + 7);
									var expire = date;

									$cookies.put("token",currentUser.token,{ 'expires': expire});

									location.href = '#/user';

								}
								else{

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
				templateUrl: 'templates/department/department-all.html'
			})


	})
angular.module('app')
	.config(function($stateProvider){

		$stateProvider

			.state('dprt.add',{
				url: '/add',
				templateUrl: 'templates/department/department-add.html'
			})


	})
angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.all',{
				url: '/all/:dprt&:position&:keyword/:page',
				templateUrl: 'templates/list/list-all.html',
				controller: function($scope,$stateParams,listall){

					var x = parseInt($stateParams.page);

					$scope.dprtopt = dprt;
					$scope.positionopt = position;

					$scope.dprt = $stateParams.dprt;
					$scope.position = $stateParams.position;
					$scope.keyword = $stateParams.keyword;

					var editmsg = {};
					editmsg.filter = {};

					editmsg.filter.dprt = $stateParams.dprt;
					editmsg.filter.position = $stateParams.position;
					editmsg.filter.keyword = $stateParams.keyword;
					editmsg.current = $stateParams.page;

					listall.show(editmsg)
						.then(function(response){
							if(response.data.code==200){

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
				controller: function($scope,$stateParams,listall){

					listall.detail($stateParams)
						.then(function(response){
							if(response.data.code==200){

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
				templateUrl: 'templates/list/list-department.html'
			})

})
angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.add',{
				url: '/add',
				templateUrl: 'templates/list/list-add.html'
			})

})
angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.recycle',{
				url: '/recycle',
				templateUrl: 'templates/list/list-recycle.html'
			})

})
angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('user.pw',{
				url: '/pwedit',
				templateUrl: 'templates/user/password-edit.html',
				controller: function($scope,userinfo){

					$scope.pwedit = function(){

						var editmsg = {};

						editmsg.old = $scope.oldpw;
						editmsg.new = $scope.newpw;
						editmsg.cfrm = $scope.cfrmpw;

						userinfo.password(editmsg)
							.then(function(response){
								if(response.data.code==200){

									alert("success");

								}
							});

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
				controller: function($scope,userinfo){

					userinfo.show()
						.then(function(response){
							
							if(response.data.code==200){
								
								$scope.content = response.data.data;
						 
								$scope.username = $scope.content.username;
								$scope.room = $scope.content.room;
								$scope.telLong = $scope.content.telLong;
								$scope.telShort = $scope.content.telShort;
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

						userinfo.edit(editmsg)
							.then(function(response){
								if(response.data.code==200){

									alert("success");

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
				controller: function($scope,userinfo){

					userinfo.show()
						.then(function(response){

							if(response.data.code==200){

								$scope.content = response.data.data;

							}
						});

				}
			});
			


	});
angular.module('app')
	
	.service('userService',function($http,$cookies) {

		currentUser = null;

		return{

			login: function(user){

				var user = user;

				return $http.post('test/get/login.json',user);

				},

			logout: function(user){

				var auth = {};

				auth.timestamp = new Date().getTime();
				auth.token = currentUser.token;

				$http.post('test/get/result.json',auth);

				$cookies.remove("token");

				currentUser = null;

				
			},

			currentuser: function(){

				return currentUser;

			},

			auth: function(){

				var auth = {};

				auth.timestamp = new Date().getTime();
				auth.token = currentUser.token;
				
				return auth;

			}

			};
		});
angular.module('app')
	
	.service('listall',function($http,userService) {

		return{

			show: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/listAll.json',postdata);

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
	
	.service('listdprt',function($http) {

		return{

			show: function(){

				return $http.post('test/get/listDprt.json',currentUser.auth)

				},

			add: function(editmsg){

				var postdata
				postdata.auth = currentUser.auth
				postdata.content = editmsg

				return $http.post('test/get/result.json',postdata)

				},

			del: function(userid){

				var postdata
				postdata.auth = currentUser.auth
				postdata.userid = userid

				return $http.post('test/get/result.json',postdata)

				},

			rcl: function(editmsg){

				var postdata
				postdata.auth = currentUser.auth
				postdata.content = editmsg

				return $http.post('test/get/result.json',postdata)

				},

			position: function(editmsg){

				var postdata
				postdata.auth = currentUser.auth
				postdata.content = editmsg

				return $http.post('test/get/result.json',postdata)

				}

			}
		}
	)
angular.module('app')
	
	.service('userinfo',function($http) {

		return{

			show: function(){

				return $http.post('test/get/userinfo.json',currentUser.auth)

				},

			edit: function(editmsg){

				var postdata
				postdata.content = editmsg
				postdata.auth = currentUser.auth

				return $http.post('test/get/result.json',postdata)
		
			},

			password: function(editmsg){

				var postdata
				postdata.content = editmsg
				postdata.auth = currentUser.auth

				return $http.post('test/get/result.json',postdata)

			}

			}
		}
	)
angular.module('app')
	
	.service('userinfo',function($http,userService) {

		return{

			show: function(){

				var postdata = {};

				postdata.auth = userService.auth();
					
				return $http.post('test/get/userinfo.json',postdata);


				},

			edit: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/result.json',postdata);
		
			},

			password: function(editmsg){

				var postdata = {}

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/result.json',postdata);

			}

			};
		}
	);
angular.module('app')
	.directive('loginBtn',function(userService){

		return{
			restrict: "A",
			link: function(scope,element,attrs){

				element.bind("click",function(){
					
					

				})
			}
		}
		
	})
angular.module('app')
	.directive('logoutBtn',function(userService){
		return{
			restrict: "A",
			link: function(scope,element,attrs){
				element.bind("click",function(){
					
                	userService.logout()

					location.href = '#/login'

				})
			}
		}
		
	})
angular.module('app')
	.directive('loginBtn',function(userService){

		return{
			restrict: "A",
			link: function(scope,element,attrs){

				element.bind("click",function(){
					
					

				})
			}
		}
		
	})