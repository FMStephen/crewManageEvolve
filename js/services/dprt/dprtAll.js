angular.module('app')
	
	.service('dprtall',function($http,userService) {

		return{

			show: function(){

				var postdata = {};

				postdata.auth = userService.auth();

				return $http.post('test/get/dprtAll.json',postdata);

				},

			editshow: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/dprtedit.json',postdata);

				},

			edit: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/result.json',postdata);

				},

			add: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/result.json',postdata)

				},

			del: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/result.json',postdata);

				}

			};
		}
	);