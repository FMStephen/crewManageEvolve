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