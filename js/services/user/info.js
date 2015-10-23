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