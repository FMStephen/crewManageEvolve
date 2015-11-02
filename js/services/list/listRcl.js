angular.module('app')
	
	.service('listrcl',function($http,userService) {

		return{

			show: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/listRcl.json',postdata);

				},

			del: function(editmsg){

				var postdata = {};
				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/result.json',postdata);		
			},

			recover: function(editmsg){

				var postdata = {};
				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/result.json',postdata);
			}

			};
		}
	);