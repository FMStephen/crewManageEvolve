angular.module('app')

  .service('listall', function ($http, userService) {
    return {
      show: function (editmsg) {
        var postdata = {}

        postdata.auth = userService.auth()
        postdata.data = editmsg

        return $http.post(host + 'User/listall', postdata)

      },

      detail: function (editmsg) {
        var postdata = {}

        postdata.auth = userService.auth()
        postdata.data = editmsg

        return $http.post(host + 'User/othersinfo', postdata)

      }



    }
  })
