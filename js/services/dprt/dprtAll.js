angular.module('app')
	
	.service('dprtall',function($http,userService) {

		return{

			show: function(){

				var postdata = {};

				postdata.auth = userService.auth();

				return $http.post(host + 'Department/listAll',postdata);

				},

			editshow: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post(host + 'Department/detail',postdata);

				},

			edit: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post(host + 'Department/edit',postdata);

				}//,

			// add: function(editmsg){

			// 	var postdata = {};

			// 	postdata.auth = userService.auth();
			// 	postdata.data = editmsg;

			// 	return $http.post(host + 'Department/add',postdata)

			// 	},

			// del: function(editmsg){

			// 	var postdata = {};

			// 	postdata.auth = userService.auth();
			// 	postdata.data = editmsg;

			// 	return $http.post(host + 'Department/del',postdata);

			// 	}

			};
		}
	);