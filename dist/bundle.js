angular.module('app',['ui.router','ngCookies'])

var currentUser
var school = [  {"name": "C.材料科学与工程学院","value": "材料科学与工程学院"},
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
  			 ]
var gender = [  {"name":"男"},
			    {"name":"女"}
			 ]
angular.module('app')
	.config(function($stateProvider,$urlRouterProvider){

		$urlRouterProvider.when('','/login')
						  .when('/user','/user/info')
						  .when('/list','/list/all')
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
				controller: function($http,$scope,$cookies,userService){

					var user = {}

					user.cookie = $cookies.get('userid')
					userService.login(user)

					$scope.update = function(){

						user.studentNo = $scope.studentNo
						user.password = $scope.password

						userService.login(user)

					}
				}
			})

		


	})
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
				url: '/all',
				templateUrl: 'templates/list/list-all.html'
			})
			.state('list.all.detail',{
				url: '/all/:userid',
				templateUrl: 'templates/list/list-detail.html'
			})

})
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

						var editmsg = {}

						editmsg.oldpw = $scope.oldpw
						editmsg.newpw = $scope.newpw
						editmsg.cfrmpw = $scope.cfrmpw

						userinfo.password(editmsg)
							.then(function(data){
								if(data.data.error==0){

									alert("success")

								}
							})

					}

				}
			})


	})
angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			
			.state('user.edit',{
				url: '/infoedit',
				templateUrl: 'templates/user/info-edit.html',
				controller: function($scope,userinfo){

					userinfo.show()
						.then(function(data){
							
							if(data.data.error==0){

								$scope.content = data.data.content

								$scope.genderopt = gender

  								$scope.gender = $scope.content.gender

  								$scope.schoolopt = school

  								$scope.school = $scope.content.school

							}
						})

					$scope.infoedit = function(){

						var editmsg = {}

						editmsg.username = $scope.username
						editmsg.gender = $scope.gender
						editmsg.school = $scope.school
						editmsg.room = $scope.room
						editmsg.telLong = $scope.telLong
						editmsg.telShort = $scope.telShort

						userinfo.edit(editmsg)
							.then(function(data){
								if(data.data.error==0){

									alert("success")

								}
							})
						
					}

					

				}
			})


	})
angular.module('app')
	.config(function($stateProvider){

		$stateProvider

			.state('user.info',{
				url: '/info',
				templateUrl: 'templates/user/info-detail.html',
				controller: function($scope,userinfo){

					userinfo.show()
						.then(function(data){
							console.log(data)
							if(data.data.error==0){

								$scope.content = data.data.content

							}
						})

				}
			})
			


	})
angular.module('app')
	
	.service('userService',function($http,$cookies) {

		currentUser = null

		return{

			login: function(user){

				var user = user

				return $http.post('test/get/user.json',user)
					.success(function(data){
						if(data.success){

							currentUser = data

							var date = new Date()
							date.setDate(date.getDate() + 7)
							var expire = date

							$cookies.put("userid",currentUser.account.userid,{ 'expires': expire})

							location.href = '#/user'
						}
						else{}
					})
				},

			logout: function(user){

				$cookies.remove("userid")

				
			},

			currentuser: function(){
				return currentUser
			}

			}
		}
	)
angular.module('app')
	
	.service('listall',function($http) {

		return{

			show: function(editmsg,page){

				var postdata
				postdata.auth = currentUser.auth
				postdata.result = editmsg 
				postdata.page = page

				return $http.post('test/get/userinfo.json',postdata)

				},

			detail: function(userid){

				var postdata
				postdata.auth = currentUser.auth
				postdata.userid = userid

				return $http.post('test/get/userinfo.json',postdata)

				}

			

			}
		}
	)
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
	
	.service('userinfo',function($http) {

		return{

			show: function(){

				return $http.post('test/get/userinfo.json',currentUser.account)

				},

			edit: function(editmsg){

				var postdata = {}
				postdata.content = editmsg
				postdata.auth = currentUser.account

				return $http.post('test/get/result.json',postdata)
		
			},

			password: function(editmsg){

				var postdata = {}
				postdata.content = editmsg
				postdata.auth = currentUser.account

				return $http.post('test/get/result.json',postdata)

			}

			}
		}
	)
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