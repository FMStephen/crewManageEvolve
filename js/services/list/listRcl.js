angular.module('app')
	
	.service('listrcl',function($http,userService) {

		return{

			show: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/listRcl.json',postdata);

				},

			edit: function(editmsg){

				var postdata
				postdata.content = editmsg
				postdata.auth = currentUser.auth

				return $http.post('test/get/result.json',postdata);
		
			},

			password: function(editmsg){

				var postdata
				postdata.content = editmsg
				postdata.auth = currentUser.auth

				return $http.post('test/get/result.json',postdata);

			}

			};
		}
	);