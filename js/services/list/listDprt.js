angular.module('app')
	
	.service('listdprt',function($http,userService) {

		return{

			show: function(){

				var postdata = {};

				postdata.auth = userService.auth();

				return $http.post('test/get/listDprt.json',postdata);

				},

			add: function(editmsg){

				var postdata
				postdata.auth = currentUser.auth
				postdata.content = editmsg

				return $http.post('test/get/result.json',postdata)

				},

			del: function(userid){

				var postdata
				postdata.auth = currentUser.auth
				postdata.userid = userid

				return $http.post('test/get/result.json',postdata)

				},

			rcl: function(editmsg){

				var postdata
				postdata.auth = currentUser.auth
				postdata.content = editmsg

				return $http.post('test/get/result.json',postdata)

				},

			position: function(editmsg){

				var postdata
				postdata.auth = currentUser.auth
				postdata.content = editmsg

				return $http.post('test/get/result.json',postdata)

				}

			}
		}
	)