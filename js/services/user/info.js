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

				var postdata = {};
				postdata.data = {};

				postdata.auth = userService.auth();
				postdata.data.old = md5(editmsg.old);
				postdata.data.new = md5(editmsg.new);
				postdata.data.cfrm = md5(editmsg.cfrm);

				return $http.post('test/get/result.json',postdata);

			}

			};
		}
	);