angular.module('app')
	
	.service('listall',function($http,userService) {

		return{

			show: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/listAll.json',postdata);

				},

			detail: function(userid){

				var postdata;

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/userinfo.json',postdata);

				}

			

			};
		});