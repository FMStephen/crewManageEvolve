angular.module('app')
	
	.service('userService',function($http) {

		currentUser = null

		return{

			login: function(user){
				return $http.post('test/get/user.json',user)
					.success(function(data){
						if(data.success){
							currentUser = data

							location.href = '#/user'
						}
					})
				},

			logout: function(user){
				return currentUser = null
			},

			currentuser: function(){
				return currentUser
			}

			}
		}
	)