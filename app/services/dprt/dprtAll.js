angular.module('app')

  .service('dprtall', ($http, userService) => {
    return {

      show() {
        var postdata = {}

        postdata.auth = userService.auth()

        return $http.post('Department/listAll', postdata)

      },

      editshow(editmsg) {
        var postdata = {}

        postdata.auth = userService.auth()
        postdata.data = editmsg

        return $http.post('Department/detail', postdata)

      },

      edit(editmsg) {
        var postdata = {}

        postdata.auth = userService.auth()
        postdata.data = editmsg

        return $http.post('Department/edit', postdata)

      } // ,
      // add(editmsg){
      // 	var postdata = {}

      // 	postdata.auth = userService.auth()
      // 	postdata.data = editmsg

      // 	return $http.post('Department/add',postdata)

      // 	},

      // del(editmsg){

      // 	var postdata = {}

      // 	postdata.auth = userService.auth()
      // 	postdata.data = editmsg

      // 	return $http.post('Department/del',postdata)

      // 	}

    }
  }
)
