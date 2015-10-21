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