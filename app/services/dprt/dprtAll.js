angular.module('app')

  .service('dprtall', ($http, userService) => {
    return {

      show() {
        return $http.post('Department/listAll')

      },

      editshow(data) {
        return $http.post('Department/detail', { data })

      },

      edit(data) {
        return $http.post('Department/edit', { data })

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
