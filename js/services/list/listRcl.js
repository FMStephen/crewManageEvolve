angular.module('app')
	
	.service('listrcl',function($http,userService) {

		return{

			show: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post(host + 'User/listRcl',postdata);

				},

			del: function(editmsg){

				var postdata = {};
				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post(host + 'User/del',postdata);		
			},

			recover: function(editmsg){

				var postdata = {};
				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post(host + 'User/recover',postdata);
			}

			};
		}
	);