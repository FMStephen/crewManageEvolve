angular.module('app')

  .service('listrcl', ($http, userService) => {
    return {
      show(editmsg) {
        var postdata = {
          auth: userService.auth(),
          data: editmsg,
        }

        return $http.post(host + 'User/listRcl', postdata)
      },

      del(editmsg) {
        var postdata = {
          auth: userService.auth(),
          data: editmsg,
        }

        return $http.post(host + 'User/del', postdata)
      },

      recover(editmsg) {
        var postdata = {
          auth: userService.auth(),
          data: editmsg,
        }

        return $http.post(host + 'User/recover', postdata)
      }
    }
  }
)
