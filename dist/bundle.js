var currentUser

angular.module('app',['ui.router','ngCookies'])
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
				templateUrl: 'templates/navi.html'
			})
			.state('list',{
				url: '/list',
				abstract: true,
				templateUrl: 'templates/navi.html'
			})
			.state('dprt',{
				url: '/dprt',
				abstract: true,
				templateUrl: 'templates/navi.html'
			})
			.state('login',{
				url: '/login',
				templateUrl: 'templates/login.html',
				controller: function($http,$scope,$cookies,userService){

					var user = {
					}

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
				templateUrl: 'templates/user/password-edit.html'
			})


	})
angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			
			.state('user.edit',{
				url: '/infoedit',
				templateUrl: 'templates/user/info-edit.html'
			})


	})
angular.module('app')
	.config(function($stateProvider){

		$stateProvider

			.state('user.info',{
				url: '/info',
				templateUrl: 'templates/user/info-detail.html'
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