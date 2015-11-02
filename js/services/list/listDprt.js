angular.module('app')
	
	.service('listdprt',function($http,userService) {

		return{

			show: function(){

				var postdata = {};

				postdata.auth = userService.auth();

				return $http.post('test/get/listDprt.json',postdata);

				},

			resetshow: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/listDprtReset.json',postdata);

				},

			add: function(editmsg){

				var postdata = {};
				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/result.json',postdata);

				},

			rcl: function(editmsg){

				var postdata = {};
				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/result.json',postdata);

				},

			position: function(editmsg){

				var postdata = {};
				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post('test/get/result.json',postdata);

				},

			reset: function(editmsg){

				var postdata = {};
				postdata.data = {};

				postdata.auth = userService.auth();
				postdata.data.id = editmsg.id;
				postdata.data.pw = md5(editmsg.pw);
				postdata.data.pwcfrm = md5(editmsg.pwcfrm);

				return $http.post('test/get/result.json',postdata);

				}

			};
		});