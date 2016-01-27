angular.module('app')

  .service('dprtall', ($http, userService) => {
    return {

      show() {
        var postdata = {}

        postdata.auth = userService.auth()

        return $http.post(host + 'Department/listAll', postdata)

      },

      editshow(editmsg) {
        var postdata = {}

        postdata.auth = userService.auth()
        postdata.data = editmsg

        return $http.post(host + 'Department/detail', postdata)

      },

      edit(editmsg) {
        var postdata = {}

        postdata.auth = userService.auth()
        postdata.data = editmsg

        return $http.post(host + 'Department/edit', postdata)

      } // ,
      // add(editmsg){
      // 	var postdata = {}

      // 	postdata.auth = userService.auth()
      // 	postdata.data = editmsg

      // 	return $http.post(host + 'Department/add',postdata)

      // 	},

      // del(editmsg){

      // 	var postdata = {}

      // 	postdata.auth = userService.auth()
      // 	postdata.data = editmsg

      // 	return $http.post(host + 'Department/del',postdata)

      // 	}

    }
  }
)
