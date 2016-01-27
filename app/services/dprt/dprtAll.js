angular.module('app')

  .service('dprtall', requestService => {
    return {

      show() {
        return requestService.post('Department/listAll')

      },

      editshow(data) {
        return requestService.post('Department/detail', { data })

      },

      edit(data) {
        return requestService.post('Department/edit', { data })

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
