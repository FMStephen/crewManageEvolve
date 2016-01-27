angular.module('app')

  .service('userinfo', ($http, userService) => {
    return {
      show() {
        var postdata = {auth: userService.auth()}

        return $http.post(host + 'User/info', postdata)
      },

      edit(editmsg) {
        var postdata = {
          auth: userService.auth(),
          data: editmsg,
        }

        return $http.post(host + 'User/infoEdit', postdata)
      },

      password(editmsg) {
        var postdata = {
          auth: userService.auth(),
          data: {
            old: md5(editmsg.old),
            cfrm: md5(editmsg.cfrm),
            'new': md5(editmsg['new']),
          }
        }

        return $http.post(host + 'User/pwEdit', postdata)
      }
    }
  }
)
