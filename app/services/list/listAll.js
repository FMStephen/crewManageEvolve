angular.module('app')

  .service('listall', ($http, userService) => {
    return {
      show(editmsg) {
        var postdata = {
          auth: userService.auth(),
          data: editmsg,
        }

        return $http.post(host + 'User/listall', postdata)
      },

      detail(editmsg) {
        var postdata = {
          auth: userService.auth(),
          data: editmsg,
        }

        return $http.post(host + 'User/othersinfo', postdata)
      }
    }
  })
