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