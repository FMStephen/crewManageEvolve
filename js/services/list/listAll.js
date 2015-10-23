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